const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  author: {
    type: String,
    required: true,
  },

  isbn: {
    type: String,
    required: true,
    unique: true,
  },

  category: {
    type: String,
    default: "General",
  },

  status: {
    type: String,
    enum: ["available", "borrowed", "reserved", "lost", "damaged"],
    default: "available",
  },

  image: {
    type: String, // store image URL
    default: "",  // optional
  },

  addedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
