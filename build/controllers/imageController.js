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
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("../queue");
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.file === undefined) {
        res.sendStatus(400);
    }
    const job = yield queue_1.imageProcessingQueue.add({
        fileName: ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "",
    });
    res.json({ id: job.id });
});
exports.default = {
    uploadImage
};
