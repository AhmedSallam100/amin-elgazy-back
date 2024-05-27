const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);
      file.filename = `${hash.toString("hex")}-${file.originalname}`;
      cb(null, file.filename);
    });
  },
});

const videoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 50000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|avi|mkv|mov)$/)) {
      return cb(new Error("يرجى رفع فيديو (MP4, AVI, MKV, أو MOV)."));
    }
    cb(null, true);
  },
});

module.exports = videoUpload;
