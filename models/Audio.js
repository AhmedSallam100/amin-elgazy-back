const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    grad: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
    },
  },
  { timestamps: true }
);

const Audio = mongoose.model("Audio", audioSchema);

module.exports = Audio;
