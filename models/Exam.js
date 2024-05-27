const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
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

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
