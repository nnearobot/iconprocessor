import Queue from 'bull';
import dotenv from 'dotenv';
dotenv.config();

interface IImageProcessJobData {
  fileName: string;
}

export const imageProcessingQueue = new Queue<IImageProcessJobData>('image-processing', {
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: Number(process.env.REDIS_PORT) || 6379
  }
});
