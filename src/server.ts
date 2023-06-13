import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import config from 'config';

import dotenv from 'dotenv';
dotenv.config();

import imageRoutes from './routes/imageRouter';
import jobRoutes from './routes/jobRouter';

const app: Application = express();
app.use(cors());
app.use(helmet());

app.use('/', express.static(config.get('public_dir')));
app.use('/images', imageRoutes);
app.use('/jobs', jobRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("This is a thunmbnail storage API");
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
    console.log(`Redis is running on host ${process.env.REDIS_HOST} and port ${process.env.REDIS_PORT}`);
});

