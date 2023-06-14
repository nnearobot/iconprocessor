import { imageProcessingQueue } from './queue';
import processor from './processor';

imageProcessingQueue.process(async (job, done) => {
  console.log(`Processing job: ${job.id}, ${job.data.fileName}`);

  try {
    await processor.imageProcess(job.data.fileName);

    // simulate a time-intensive task:
    let counter = 0;
    for (let i = 0; i < 10_000_000_000; i++) {
      counter++;
    };

    console.log(`Completed job: ${job.id}`);

  } catch (error) {
    console.log(`Processing failed for job ${job.id}:`, error);
  }

  done();
});

console.log("Worker is running");