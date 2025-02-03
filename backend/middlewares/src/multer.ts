// @ts-types="@types/multer"
import multer from 'multer';
// @ts-types="@types/express"
import { Router, Request } from 'express';

const mutlerMiddleware = Router();

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'images');
  },
  filename: (_req, file, cb) => {
    const fileNewName = new Date().toISOString();
    const fileExtension = file.mimetype.split('/')[1];

    cb(null, fileNewName + '.' + fileExtension);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const validTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
  if (validTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

mutlerMiddleware.use(
  multer({ storage: fileStorage, fileFilter }).single('image')
);

export default mutlerMiddleware;
