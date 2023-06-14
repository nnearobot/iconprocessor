import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import config from 'config';

import processor  from '../src/processor';

describe("Image processing test", () => {
  const ROOT_PATH = path.dirname(__dirname);
  
  const testImageName = 'test_image.jpg';
  const uploadedName = Date.now() + "_" + testImageName;

  let inputPath: string;
  let outputPath: string;

  // first copy a test image to uploaded folder:
  beforeAll(async () => {
    inputPath = path.join(ROOT_PATH, config.get('upload_dir'), uploadedName);
    outputPath = path.join(ROOT_PATH, config.get('public_dir'), uploadedName);
    fs.copyFileSync(path.join(__dirname, testImageName), inputPath);
  })

  // delete the processed file
  afterAll(async () => {
    fs.unlinkSync(outputPath);
  })

  test("Process image", async () => {
    // check if image path is as expected:
    const processedImagePath = await processor.imageProcess(uploadedName);
    expect(processedImagePath).toBe(outputPath);

    // check if image size is as expected:
    const metadata = await sharp(outputPath).metadata();
    expect(metadata.width).toBeLessThanOrEqual(config.get('icon_width'));
    expect(metadata.height).toBeLessThanOrEqual(config.get('icon_height'));
  });

});




