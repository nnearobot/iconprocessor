"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("./queue");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("config"));
const ROOT_PATH = path_1.default.dirname(__dirname);
queue_1.imageProcessingQueue.process((job, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Processing job: ${job.id}, ${job.data.fileName}`);
    const inputPath = path_1.default.join(ROOT_PATH, config_1.default.get('upload_dir'), job.data.fileName);
    const outputPath = path_1.default.join(ROOT_PATH, config_1.default.get('public_dir'), job.data.fileName);
    try {
        yield (0, sharp_1.default)(inputPath)
            .resize(config_1.default.get('icon_width'), config_1.default.get('icon_height'), {
            fit: sharp_1.default.fit.contain,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
            .toFile(outputPath);
        // delete the original file
        fs_1.default.unlinkSync(inputPath);
        // simulate a time-intensive task:
        let counter = 0;
        for (let i = 0; i < 10000000000; i++) {
            counter++;
        }
        ;
        console.log(`Completed job: ${job.name}`);
    }
    catch (error) {
        console.log(`Processing failed for job ${job.id}:`, error);
    }
    done();
}));
