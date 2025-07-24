// middlewares/multer.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the directory exists
const uploadPath = 'public/images';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `image-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

export default upload;
