// src/jobs/jobs.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { SIMPLE_QUEUE } from './constants';

@Processor(SIMPLE_QUEUE)
export class JobsProcessor extends WorkerHost {
  // runs for each job
  async process(job: Job<any, any, string>) {
    if (job.name === 'heavy-task') {
      const { userId, payload } = job.data;
      // simulate heavy work (e.g., send email, generate PDF, call 3rd-party)
      console.log(`[worker] start heavy-task for user ${userId}`);
      await new Promise((r) => setTimeout(r, 1500));
      console.log(`[worker] done heavy-task "${payload}"`);
      return { ok: true };
    }

    console.warn(`[worker] unhandled job: ${job.name}`);
  }
}
