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

const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // limit file size to 10MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image (JPG, JPEG or PNG)."));
    }
    cb(null, true);
  },
});

module.exports = imageUpload;
