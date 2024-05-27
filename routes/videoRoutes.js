const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addNewVideo,
  getAllVideos,
  getSingleVideo,
  deleteVideo,
} = require("../controllers/videoControllers");
const videoUpload = require("../middlewares/videoUpload");

router.post("/", videoUpload.single("video"), addNewVideo);
router.get("/", getAllVideos);
router.get("/:id", getSingleVideo);
router.delete("/:id", deleteVideo);

module.exports = router;
