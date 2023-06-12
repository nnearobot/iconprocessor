import { imageProcessingQueue } from './queue';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import config from 'config';


const ROOT_PATH = path.dirname(__dirname);

imageProcessingQueue.process(async (job, done) => {
  console.log(`Processing job: ${job.id}, ${job.data.fileName}`);

  const inputPath = path.join(ROOT_PATH, config.get('upload_dir'), job.data.fileName);
  const outputPath = path.join(ROOT_PATH, config.get('public_dir'), job.data.fileName);

  try {
    await sharp(inputPath)
      .resize(config.get('icon_width'), config.get('icon_height'), {
        fit: sharp.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(outputPath);

    // delete the original file
    fs.unlinkSync(inputPath);

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
