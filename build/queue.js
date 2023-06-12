"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageProcessingQueue = void 0;
const bull_1 = __importDefault(require("bull"));
exports.imageProcessingQueue = new bull_1.default('image-processing', {
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379
    }
});
