"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const imageRouter_1 = __importDefault(require("./routes/imageRouter"));
const jobRouter_1 = __importDefault(require("./routes/jobRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use('/', express_1.default.static(config_1.default.get('public_dir')));
app.use('/images', imageRouter_1.default);
app.use('/jobs', jobRouter_1.default);
app.get("/", (req, res) => {
    res.send("This is a thunmbnail storage API");
});
app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
    console.log(`Redis is running on host ${process.env.REDIS_HOST} and port ${process.env.REDIS_PORT}`);
});
