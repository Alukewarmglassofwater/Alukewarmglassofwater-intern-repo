import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class JobsProcessor extends WorkerHost {
    process(job: Job<any, any, string>): Promise<{
        ok: boolean;
    } | undefined>;
}
