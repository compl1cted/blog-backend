import multer, { diskStorage } from "multer";
import { extname } from "path";
import { v4 } from "uuid";

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, v4() + extname(file.originalname))
    }
});

export const Upload = multer({ storage });