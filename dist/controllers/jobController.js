"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("../queue");
const getJobList = async (_req, res) => {
    const jobs = await queue_1.imageProcessingQueue.getJobs(['completed', 'waiting', 'active', 'delayed', 'failed', 'paused']);
    res.json({ jobs: jobs.map(job => ({
            id: job.id,
            status: job.finishedOn ? 'succeeded' : 'in progress'
        }))
    });
};
const getJobStatus = async (req, res) => {
    const job = await queue_1.imageProcessingQueue.getJob(req.params.id);
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
};
const removeJob = async (req, res) => {
    const job = await queue_1.imageProcessingQueue.getJob(req.params.id);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }
    await job.remove();
    res.send(`Job ${req.params.id} has been removed`);
};
exports.default = {
    getJobList,
    getJobStatus,
    removeJob
};
