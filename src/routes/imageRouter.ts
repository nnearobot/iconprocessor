import {Router, Request} from 'express';
import config from 'config';
import multer from 'multer';
import imageController from '../controllers/imageController';


// Storage engine that configures Multer with destination and filename
const fileStorageEngine = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, callback: CallableFunction) => {
      callback(null, config.get('upload_dir'));
    },
    filename: (_req: Request, file: Express.Multer.File, callback: CallableFunction) => {
      callback(null, Date.now() + "_" + file.originalname);
    },
});
const upload = multer({ storage: fileStorageEngine });

const imageRouter = Router();


// uploading image
imageRouter.post("/", upload.single(config.get("image_input_name")), imageController.uploadImage);


export default imageRouter;