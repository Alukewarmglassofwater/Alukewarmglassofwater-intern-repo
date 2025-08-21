// src/jobs/jobs.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { JobsProducer } from './jobs.producer';
import { JobsProcessor } from './jobs.processor';
import { JobsController } from './jobs.controller';
import { SIMPLE_QUEUE } from './constants';

@Module({
  imports: [BullModule.registerQueue({ name: SIMPLE_QUEUE })],
  controllers: [JobsController],
  providers: [JobsProducer, JobsProcessor],
})
export class JobsModule {}
