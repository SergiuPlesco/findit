import multer from "multer";
import type { Request } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "server/uploads");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const formatedDate = new Date()
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");

    const originalName = file.originalname.toLowerCase().replaceAll(" ", "");

    const fileName = `${formatedDate}-${originalName}`;

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg, .jpeg formats are allowed."));
    }
  },
});

export default upload;
