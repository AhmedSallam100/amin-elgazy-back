const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    grad: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
