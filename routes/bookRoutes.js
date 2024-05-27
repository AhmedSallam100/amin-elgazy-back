const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addNewBook,
  getAllAudios,
  getSingleAudio,
  deleteAudio,
} = require("../controllers/bookControllers");
const bookUpload = require("../middlewares/bookUpload");
const imageUpload = require("../middlewares/imageUpload");
const mixUpload = require("../middlewares/mixUpload");

router.post(
  "/",
  mixUpload.fields([
    { name: "book", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  addNewBook
);
router.get("/", getAllAudios);
router.get("/:id", getSingleAudio);
router.delete("/:id", deleteAudio);

module.exports = router;
