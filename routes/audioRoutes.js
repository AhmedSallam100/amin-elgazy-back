const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addNewAudio,
  getAllAudios,
  getSingleAudio,
  deleteAudio,
} = require("../controllers/audioControllers");
const audioUpload = require("../middlewares/audioUpload");

router.post("/", audioUpload.single("audio"), addNewAudio);
router.get("/", getAllAudios);
router.get("/:id", getSingleAudio);
router.delete("/:id", deleteAudio);

module.exports = router;
