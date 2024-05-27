const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const Sheet = require("../models/Sheet");

/** =============================
 * @desc  Add new sheet
 * @route  /api/sheets
 * @method  POST
=============================*/

const addNewSheet = async (req, res, next) => {
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
    const newSheet = await Sheet.create({
      title: title,
      grad: grad,
      image: result.secure_url,
    });

    // Update image field in db
    // newExam.image = result.secure_url;

    console.log(req.file.filename);
    res.json(newSheet);

    // Delete exam image fron server
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error("Error adding new sheet:", error);
    res.status(500).json({ message: "Error adding new sheet" });
  }
};

/** =============================
 * @desc  Get all sheets
 * @route  /api/sheets
 * @method  GET
  =============================*/
const getAllSheets = async (req, res, next) => {
  try {
    const sheets = await Sheet.find();
    res.status(200).json(sheets);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/** =============================
 * @desc  Get single sheet
 * @route  /api/sheets/:id
 * @method  GET
  =============================*/
const getSingleSheet = async (req, res, next) => {
  try {
    const sheetId = req.params.id;
    const sheet = await Sheet.findById(sheetId);
    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found..!" });
    }
    return res.status(200).json(sheet);
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

/** =============================
 * @desc  Edit exam
 * @route  /api/exams/:id
 * @method  PATACH
  =============================*/
const editSheet = async (req, res, next) => {};

/** =============================
 * @desc  Delete sheet
 * @route  /api/sheets/:id
 * @method  DELETE
  =============================*/
const deleteSheet = async (req, res, next) => {
  try {
    const sheetId = req.params.id;
    const deletedSheet = await Sheet.findByIdAndDelete(sheetId);
    if (!deletedSheet) {
      return res.status(404).json({ message: "Sheet not found..!" });
    }
    await cloudinaryRemoveImage(deletedSheet.image);
    res.status(200).json({ message: "Sheet deleted successfully" });
  } catch (error) {
    console.error("Error deleting sheet:", error);
    res.status(500).json({ message: "Error deleting sheet" });
  }
};

module.exports = {
  addNewSheet,
  getAllSheets,
  getSingleSheet,
  editSheet,
  deleteSheet,
};
