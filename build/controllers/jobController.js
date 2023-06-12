"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("../queue");
const getJobList = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield queue_1.imageProcessingQueue.getJobs(['completed', 'waiting', 'active', 'delayed', 'failed', 'paused']);
    res.json({ jobs: jobs.map(job => ({
            id: job.id,
            status: job.finishedOn ? 'succeeded' : 'in progress'
        }))
    });
});
const getJobStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield queue_1.imageProcessingQueue.getJob(req.params.id);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }
    let response = {
        id: job.id,
        completed: !!job.finishedOn,
        data: job.data,
        icon: ""
    };
    // If job is completed and there is output data, return the image URL
    if (job.finishedOn && job.data.fileName) {
        response['icon'] = `http://${req.headers.host}/${job.data.fileName}`;
    }
    res.json(response);
});
const removeJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield queue_1.imageProcessingQueue.getJob(req.params.id);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }
    yield job.remove();
    res.send(`Job ${req.params.id} has been removed`);
});
exports.default = {
    getJobList,
    getJobStatus,
    removeJob
};
