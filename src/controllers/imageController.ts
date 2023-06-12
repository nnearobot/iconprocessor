import { Request, Response } from 'express';
import { imageProcessingQueue } from '../queue';


const uploadImage = async (req: Request, res: Response) => {
    if (req.file === undefined) {
        res.sendStatus(400); 
    }

    const job = await imageProcessingQueue.add({
        fileName: req.file?.filename || "",
    });

    res.json({ id: job.id });
}


export default {
    uploadImage
};