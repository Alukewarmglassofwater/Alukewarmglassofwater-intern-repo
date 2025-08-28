"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const constants_1 = require("./constants");
let JobsProcessor = class JobsProcessor extends bullmq_1.WorkerHost {
    async process(job) {
        if (job.name === 'heavy-task') {
            const { userId, payload } = job.data;
            console.log(`[worker] start heavy-task for user ${userId}`);
            await new Promise((r) => setTimeout(r, 1500));
            console.log(`[worker] done heavy-task "${payload}"`);
            return { ok: true };
        }
        console.warn(`[worker] unhandled job: ${job.name}`);
    }
};
exports.JobsProcessor = JobsProcessor;
exports.JobsProcessor = JobsProcessor = __decorate([
    (0, bullmq_1.Processor)(constants_1.SIMPLE_QUEUE)
], JobsProcessor);
//# sourceMappingURL=jobs.processor.js.map