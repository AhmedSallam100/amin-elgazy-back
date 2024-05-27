const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadAudio,
  cloudinaryRemoveAudio,
} = require("../utils/cloudinary");
const Audio = require("../models/Audio");

/** =============================
 * @desc  Add new audio
 * @route  /api/audios
 * @method  POST
=============================*/

const addNewAudio = async (req, res) => {
  const audioPath = req.file
    ? path.join(__dirname, `../uploads/${req.file.filename}`)
    : null;
  try {
    const { title, grad } = req.body;
    if (!audioPath) {
      return res.status(400).json({ message: "Audio file is required." });
    }

    // Upload audio to cloudinary
    const result = await cloudinaryUploadAudio(audioPath);
    console.log(result);

    // Create new audio entry in the database
    const newAudio = await Audio.create({
      title: title,
      grad: grad,
      audio: result.secure_url,
    });
    res.json(newAudio);
  } catch (error) {
    console.error("Error adding new audio:", error);
    res.status(500).json({ message: "Error adding new audio" });
  } finally {
    // Delete audio file from server
    if (audioPath && fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
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
  addNewAudio,
  getAllAudios,
  getSingleAudio,
  editAudio,
  deleteAudio,
};
