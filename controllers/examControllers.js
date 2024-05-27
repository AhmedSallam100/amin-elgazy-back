const express = require("express");
const Exam = require("../models/Exam");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/** =============================
 * @desc  Add new exam
 * @route  /api/exams
 * @method  POST
=============================*/

const addNewExam = async (req, res, next) => {
  try {
    const { title, grad } = req.body;

    // Data of image
    const image = req.file ? req.file.filename : null;
    const imageName = req.file.filename;
    const imagePath = path.join(__dirname, `../uploads/${imageName}`);

    // Upload image to cloudinary
    const result = await cloudinaryUploadImage(imagePath);
    console.log(result);

    // Create new exam
    const newExam = await Exam.create({
      title: title,
      grad: grad,
      image: result.secure_url,
    });

    // Update image field in db
    // newExam.image = result.secure_url;

    console.log(req.file.filename);
    res.json(newExam);

    // Delete exam image fron server
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error("Error adding new exam:", error);
    res.status(500).json({ message: "Error adding new exam" });
  }
};

/** =============================
 * @desc  Get all exams
 * @route  /api/exams
 * @method  GET
  =============================*/
const getAllExams = async (req, res, next) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/** =============================
 * @desc  Get single exam
 * @route  /api/exams/:id
 * @method  GET
  =============================*/
const getSingleExam = async (req, res, next) => {
  try {
    const examId = req.params.id;
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found..!" });
    }
    return res.status(200).json(exam);
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

/** =============================
 * @desc  Edit exam
 * @route  /api/exams/:id
 * @method  PATACH
  =============================*/
const editExam = async (req, res, next) => {};

/** =============================
 * @desc  Delete exam
 * @route  /api/exams/:id
 * @method  DELETE
  =============================*/
const deleteExam = async (req, res, next) => {
  try {
    const examId = req.params.id;
    const deletedExam = await Exam.findByIdAndDelete(examId);
    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found..!" });
    }
    await cloudinaryRemoveImage(deletedExam.image);
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ message: "Error deleting exam" });
  }
};

module.exports = {
  addNewExam,
  getAllExams,
  getSingleExam,
  editExam,
  deleteExam,
};
