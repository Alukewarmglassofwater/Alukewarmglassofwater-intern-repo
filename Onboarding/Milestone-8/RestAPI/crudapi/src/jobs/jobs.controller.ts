// src/jobs/jobs.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { JobsProducer } from './jobs.producer';

@Controller('jobs')
export class JobsController {
  constructor(private readonly producer: JobsProducer) {}

  @Post('enqueue')
  enqueue(@Body() body: { userId: number; payload: string }) {
    return this.producer.doHeavyThing(body);
  }
}
