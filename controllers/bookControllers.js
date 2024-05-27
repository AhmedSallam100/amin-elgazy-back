const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadBook,
  cloudinaryRemoveBook,
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const Book = require("../models/Book");

/** =============================
 * @desc  Add new book
 * @route  /api/books
 * @method  POST
=============================*/

const addNewBook = async (req, res) => {
  const bookPath = req.files.book[0].filename
    ? path.join(__dirname, `../uploads/${req.files.book[0].filename}`)
    : null;
  console.log(req.files.book[0].filename);
  const imagePath = req.files.image
    ? path.join(__dirname, `../uploads/${req.files.image[0].filename}`)
    : null;
  try {
    const { title, grad } = req.body;
    if (!bookPath) {
      return res.status(400).json({ message: "Book file is required." });
    }
    if (!imagePath) {
      return res.status(400).json({ message: "Image file is required." });
    }

    // Upload book to cloudinary
    const bookResult = await cloudinaryUploadBook(bookPath);
    console.log(`Book: ${bookResult}`);

    // Upload image to cloudinary
    const imageResult = await cloudinaryUploadImage(imagePath);
    console.log(`Image: ${imageResult}`);

    // Create new audio entry in the database
    const newBook = await Book.create({
      title: title,
      grad: grad,
      image: imageResult.secure_url,
      book: bookResult.secure_url,
    });
    res.json(newBook);
  } catch (error) {
    console.error("Error adding new book:", error);
    res.status(500).json({ message: "Error adding new book" });
  } finally {
    // Delete audio file from server
    if (bookPath && fs.existsSync(bookPath)) {
      fs.unlinkSync(bookPath);
    }
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};

/** =============================
 * @desc  Get all audios
 * @route  /api/audios
 * @method  GET
  =============================*/
const getAllAudios = async (req, res, next) => {
  try {
    const audios = await Audio.find();
    res.status(200).json(audios);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/** =============================
 * @desc  Get single audio
 * @route  /api/audios/:id
 * @method  GET
  =============================*/
const getSingleAudio = async (req, res, next) => {
  try {
    const audioId = req.params.id;
    const audio = await Audio.findById(audioId);
    if (!audio) {
      return res.status(404).json({ message: "Audio not found..!" });
    }
    return res.status(200).json({
      _id: audio._id,
      title: audio.title,
      grad: audio.grad,
      audio: audio.audio,
      createdAt: audio.createdAt,
      updatedAt: audio.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

/** =============================
 * @desc  Edit audio
 * @route  /api/audios/:id
 * @method  PATACH
  =============================*/
const editAudio = async (req, res, next) => {};

/** =============================
 * @desc  Delete audio
 * @route  /api/audios/:id
 * @method  DELETE
  =============================*/
const deleteAudio = async (req, res, next) => {
  try {
    const audioId = req.params.id;
    const deletedAudio = await Audio.findByIdAndDelete(audioId);
    if (!deletedAudio) {
      return res.status(404).json({ message: "Audio not found..!" });
    }
    await cloudinaryRemoveAudio(deletedAudio.audio);
    res.status(200).json({ message: "Audio deleted successfully" });
  } catch (error) {
    console.error("Error deleting audio:", error);
    res.status(500).json({ message: "Error deleting audio" });
  }
};

module.exports = {
  addNewBook,
  getAllAudios,
  getSingleAudio,
  editAudio,
  deleteAudio,
};
