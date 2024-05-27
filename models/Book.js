const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
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
    book: {
      type: String,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
