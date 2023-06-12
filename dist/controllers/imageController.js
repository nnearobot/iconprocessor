"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("../queue");
const uploadImage = async (req, res) => {
    if (req.file === undefined) {
        res.sendStatus(400);
    }
    const job = await queue_1.imageProcessingQueue.add({
        fileName: req.file?.filename || "",
    });
    res.json({ id: job.id });
};
exports.default = {
    uploadImage
};
