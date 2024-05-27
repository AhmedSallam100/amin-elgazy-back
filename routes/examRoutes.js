const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  addNewExam,
  getAllExams,
  getSingleExam,
  editExam,
  deleteExam,
} = require("../controllers/examControllers");
const imageUpload = require("../middlewares/imageUpload");

router.post("/", imageUpload.single("image"), addNewExam);
router.get("/", getAllExams);
router.get("/:id", getSingleExam);
router.patch("/:id", editExam);
router.delete("/:id", deleteExam);

module.exports = router;
