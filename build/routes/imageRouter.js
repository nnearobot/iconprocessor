"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = __importDefault(require("config"));
const multer_1 = __importDefault(require("multer"));
const imageController_1 = __importDefault(require("../controllers/imageController"));
// Storage engine that configures Multer with destination and filename
const fileStorageEngine = multer_1.default.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, config_1.default.get('upload_dir'));
    },
    filename: (_req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: fileStorageEngine });
const imageRouter = (0, express_1.Router)();
// uploading image
imageRouter.post("/", upload.single(config_1.default.get("image_input_name")), imageController_1.default.uploadImage);
exports.default = imageRouter;
