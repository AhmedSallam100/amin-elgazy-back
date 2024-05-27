const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadVideo,
  cloudinaryRemoveVideo,
} = require("../utils/cloudinary");
const Video = require("../models/Video");

/** =============================
 * @desc  Add new video
 * @route  /api/videos
 * @method  POST
=============================*/

const addNewVideo = async (req, res, next) => {
  const videoPath = req.file
    ? path.join(__dirname, `../uploads/${req.file.filename}`)
    : null;
  try {
    const { title, grad, type } = req.body;
    if (!videoPath) {
      return res.status(400).json({ message: "Video file is required." });
    }

    // Upload video to cloudinary
    const result = await cloudinaryUploadVideo(videoPath);
    console.log(result);

    // Create new video entry in the database
    const newVideo = await Video.create({
      title: title,
      grad: grad,
      type: type,
      video: result.secure_url,
    });
    res.json(newVideo);
  } catch (error) {
    console.error("Error adding new video:", error);
    res.status(500).json({ message: "Error adding new video" });
  } finally {
    // Delete video file from server
    if (videoPath && fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }
  }
};

/** =============================
 * @desc  Get all videos
 * @route  /api/videos
 * @method  GET
  =============================*/
const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/** =============================
 * @desc  Get single video
 * @route  /api/videos/:id
 * @method  GET
  =============================*/
const getSingleVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found..!" });
    }
    return res.status(200).json(video);
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
 * @desc  Delete video
 * @route  /api/videos/:id
 * @method  DELETE
  =============================*/
const deleteVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const deletedVideo = await Video.findByIdAndDelete(videoId);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found..!" });
    }
    await cloudinaryRemoveVideo(deletedVideo.image);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Error deleting video" });
  }
};

module.exports = {
  addNewVideo,
  getAllVideos,
  getSingleVideo,
  editBoard,
  deleteVideo,
};
