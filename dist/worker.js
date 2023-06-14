"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("./queue");
const processor_1 = __importDefault(require("./processor"));
queue_1.imageProcessingQueue.process(async (job, done) => {
    console.log(`Processing job: ${job.id}, ${job.data.fileName}`);
    try {
        await processor_1.default.imageProcess(job.data.fileName);
        // simulate a time-intensive task:
        let counter = 0;
        for (let i = 0; i < 10000000000; i++) {
            counter++;
        }
        ;
        console.log(`Completed job: ${job.id}`);
    }
    catch (error) {
        console.log(`Processing failed for job ${job.id}:`, error);
    }
    done();
});
console.log("Worker is running");
