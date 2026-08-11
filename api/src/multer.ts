import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs"; 

fs.mkdirSync("public/uploads", { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const upload = multer({ storage });
