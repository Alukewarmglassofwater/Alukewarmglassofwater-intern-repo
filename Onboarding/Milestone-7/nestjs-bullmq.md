docker run -p 6379:6379 --name redis -d redis:7-alpine

# Queue running evidence:

![alt text](image-8.png)

# Reflection

## Why is BullMQ used instead of handling tasks directly in API requests?

- Non-blocking responses are used to offload slow/CPU-heavy or I/O-heavy work (emails, PDFs, video/image processing) so the API returns immediately.
- Jobs that are stored in Redis survive process restarts and can be resumed/retried.
- Retries can be configured as well as backoffs if faliure keeps occuring.
- Can run N workers in parallel whilst monitoring downstream usage so it doesn't become maxed out.
- Can delay jobs, run on a cron, and throttle throughput with built-in rate limiting.
- Bull board can be used to view job status.

---

## How does Redis help manage job queues in BullMQ?

- Job data is retained via Redis if a worked crashes.
- Job addition/removal is atomic. Duplicates can't happen.
- Workers get notified when new jobs show up, therefore don't need to continously poll for job availability.
- Easily scalable by creating more job processors when required.
- Job state tracking as previously mentioned helps manage the job que in BullMQ.

---

## What happens if a job fails? How can failed jobs be retried?

- Automatic retries can be configured per job:

  ```ts
  queue.add('task', data, {
    attempts: 5,
    backoff: { type: 'exponential', delay: 1000 }, // 1s, 2s, 4s, ...
    removeOnComplete: 100,
    removeOnFail: false,
  });
  ```

- Built in failure handling. If process() throws/rejects, BullMQ increments the attempt, applies backoff, and requeues until attempts are exhausted.
- If a worker dies mid-processing, BullMQ detects stalls and requeues the job.
- Fully-failed jobs remain in the failed state can can be inspected manually.

# How does Focus Bear use BullMQ for background tasks?

- Potentially to handle push notifications.
- Generate usage reports then notify when complete.
- Potential maintenenace tasks.
- Synchronizing data with other APIs,
- Potentially limit API polling rates for other services.

## Notes

- BullMQ is a Node.js library for managing job queues.
- Redis is a bacbone storage engine for BullMQ
  - Handles notifications
  - Atomic job addition/removal
    - Many producers/workes can connect to the same Redis intance and queues will be allocated automatically.
    - No too workes will grab the same job at once.

# Full Flow (step-by-step)

- Client makes a POST request → POST /jobs/enqueue { userId, payload }.
- JobsController receives it, passes data to JobsProducer.
- JobsProducer → enqueues a "heavy-task" job into Redis.
- BullMQ (via Redis) notifies any workers subscribed to "simple".
- JobsProcessor picks it up, runs the heavy logic, logs start & finish.
- Job result & state (waiting → active → completed/failed) is tracked in Redis.

# Analogy

- JobsController → Reception desk.
- JobsProducer → Clerk who puts the task in the inbox.
- Redis → The inbox / job board where tasks wait.
- JobsProcessor → Worker in the back room who takes tasks and completes them
