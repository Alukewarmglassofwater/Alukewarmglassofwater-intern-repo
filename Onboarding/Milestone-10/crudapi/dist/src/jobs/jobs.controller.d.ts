import { JobsProducer } from './jobs.producer';
export declare class JobsController {
    private readonly producer;
    constructor(producer: JobsProducer);
    enqueue(body: {
        userId: number;
        payload: string;
    }): Promise<import("bullmq").Job<any, any, string>>;
}
