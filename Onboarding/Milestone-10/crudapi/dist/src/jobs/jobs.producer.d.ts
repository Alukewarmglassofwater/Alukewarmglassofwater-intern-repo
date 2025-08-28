import { Queue } from 'bullmq';
export declare class JobsProducer {
    private readonly queue;
    constructor(queue: Queue);
    doHeavyThing(input: {
        userId: number;
        payload: string;
    }): Promise<import("bullmq").Job<any, any, string>>;
}
