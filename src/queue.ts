import Queue from 'bull';

interface IImageProcessJobData {
  fileName: string;
}

export const imageProcessingQueue = new Queue<IImageProcessJobData>('image-processing', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379
  }
});
