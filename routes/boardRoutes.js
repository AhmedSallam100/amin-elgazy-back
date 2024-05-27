const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addNewBoard,
  getAllBoards,
  getSingleBoard,
  editBoard,
  deleteBoard,
} = require("../controllers/boardControllers");
const imageUpload = require("../middlewares/imageUpload");

router.post("/", imageUpload.single("image"), addNewBoard);
router.get("/", getAllBoards);
router.get("/:id", getSingleBoard);
router.patch("/:id", editBoard);
router.delete("/:id", deleteBoard);

module.exports = router;
