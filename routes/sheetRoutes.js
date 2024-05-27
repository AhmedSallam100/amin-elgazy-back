const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addNewSheet,
  getAllSheets,
  getSingleSheet,
  editSheet,
  deleteSheet,
} = require("../controllers/sheetControllers");
const imageUpload = require("../middlewares/imageUpload");

router.post("/", imageUpload.single("image"), addNewSheet);
router.get("/", getAllSheets);
router.get("/:id", getSingleSheet);
router.patch("/:id", editSheet);
router.delete("/:id", deleteSheet);

module.exports = router;
