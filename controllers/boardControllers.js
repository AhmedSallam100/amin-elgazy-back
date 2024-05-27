const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const Board = require("../models/Board");

/** =============================
 * @desc  Add new board
 * @route  /api/boards
 * @method  POST
=============================*/

const addNewBoard = async (req, res, next) => {
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
    const newBoard = await Board.create({
      title: title,
      grad: grad,
      image: result.secure_url,
    });

    // Update image field in db
    // newExam.image = result.secure_url;

    console.log(req.file.filename);
    res.json(newBoard);

    // Delete exam image fron server
    fs.unlinkSync(imagePath);
  } catch (error) {
    console.error("Error adding new sheet:", error);
    res.status(500).json({ message: "Error adding new sheet" });
  }
};

/** =============================
 * @desc  Get all boards
 * @route  /api/boards
 * @method  GET
  =============================*/
const getAllBoards = async (req, res, next) => {
  try {
    const boards = await Board.find();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/** =============================
 * @desc  Get single board
 * @route  /api/boards/:id
 * @method  GET
  =============================*/
const getSingleBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found..!" });
    }
    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

/** =============================
 * @desc  Edit board
 * @route  /api/boards/:id
 * @method  PATACH
  =============================*/
const editBoard = async (req, res, next) => {};

/** =============================
 * @desc  Delete board
 * @route  /api/boards/:id
 * @method  DELETE
  =============================*/
const deleteBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const deletedBoard = await Board.findByIdAndDelete(boardId);
    if (!deleteBoard) {
      return res.status(404).json({ message: "Board not found..!" });
    }
    await cloudinaryRemoveImage(deletedBoard.image);
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error deleting board:", error);
    res.status(500).json({ message: "Error deleting board" });
  }
};

module.exports = {
  addNewBoard,
  getAllBoards,
  getSingleBoard,
  editBoard,
  deleteBoard,
};
