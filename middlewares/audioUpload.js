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

const audioUpload = multer({
  storage: storage,
  limits: {
    fileSize: 50000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp3|wav|aac|flac|ogg|m4a)$/)) {
      return cb(
        new Error("يرجى رفع ملف صوتي (MP3, WAV, AAC, FLAC, OGG, أو M4A).")
      );
    }
    cb(null, true);
  },
});

module.exports = audioUpload;
