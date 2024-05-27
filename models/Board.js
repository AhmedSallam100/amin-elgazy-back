const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    grad: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
