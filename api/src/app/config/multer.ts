import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req: any, file: Express.Multer.File, cb: any) => {
    const uploadDir = "uploads/products";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req: any, file: Express.Multer.File, cb: any) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files (jpeg, jpg, png, gif, webp) are allowed"));
    }
  },
});

export const productImageUpload = upload.single("image");

export const createFileUpload = (
  fieldName: string,
  allowedTypes: RegExp,
  maxSize: number = 5 * 1024 * 1024,
) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req: any, file: Express.Multer.File, cb: any) => {
        const uploadDir = `uploads/${fieldName}`;
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (req: any, file: Express.Multer.File, cb: any) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(
          null,
          file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
        );
      },
    }),
    limits: {
      fileSize: maxSize,
    },
    fileFilter: (
      req: any,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ) => {
      const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase(),
      );
      const mimetype = allowedTypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error(`Only files matching ${allowedTypes} are allowed`));
      }
    },
  }).single(fieldName);
};
