"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = __importDefault(require("../controllers/jobController"));
const jobRouter = (0, express_1.Router)();
// fetching a job list
jobRouter.get('/', jobController_1.default.getJobList);
// fetching a status of particular job
jobRouter.get('/:id', jobController_1.default.getJobStatus);
// remove the job
jobRouter.delete('/:id', jobController_1.default.removeJob);
exports.default = jobRouter;
