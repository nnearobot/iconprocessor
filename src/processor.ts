import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import config from 'config';

const ROOT_PATH = path.dirname(__dirname);

const imageProcess = async (fileName: string) => {
  const inputPath = path.join(ROOT_PATH, config.get('upload_dir'), fileName);
  const outputPath = path.join(ROOT_PATH, config.get('public_dir'), fileName);

  await sharp(inputPath)
    .resize(config.get('icon_width'), config.get('icon_height'), {
      fit: sharp.fit.contain,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .toFile(outputPath);

  // delete the original file
  fs.unlinkSync(inputPath);

  return outputPath;
}

export default {
  imageProcess
};
