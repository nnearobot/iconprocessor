"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("config"));
const ROOT_PATH = path_1.default.dirname(__dirname);
const imageProcess = async (fileName) => {
    console.log('fileName: ', fileName);
    const inputPath = path_1.default.join(ROOT_PATH, config_1.default.get('upload_dir'), fileName);
    const outputPath = path_1.default.join(ROOT_PATH, config_1.default.get('public_dir'), fileName);
    await (0, sharp_1.default)(inputPath)
        .resize(config_1.default.get('icon_width'), config_1.default.get('icon_height'), {
        fit: sharp_1.default.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
        .toFile(outputPath);
    // delete the original file
    fs_1.default.unlinkSync(inputPath);
    return outputPath;
};
exports.default = {
    imageProcess
};
