const mongoose = require("mongoose");

const sheetSchema = new mongoose.Schema(
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

const Sheet = mongoose.model("Sheet", sheetSchema);

module.exports = Sheet;
