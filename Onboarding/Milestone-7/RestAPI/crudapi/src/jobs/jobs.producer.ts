// src/jobs/jobs.producer.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SIMPLE_QUEUE } from './constants';

@Injectable()
export class JobsProducer {
  constructor(@InjectQueue(SIMPLE_QUEUE) private readonly queue: Queue) {}

  async doHeavyThing(input: { userId: number; payload: string }) {
    return this.queue.add('heavy-task', input, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: 100,
      removeOnFail: 100,
      // delay: 5000, // optional: run 5s later
    });
  }
}
