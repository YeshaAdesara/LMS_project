const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const Book = require("../models/Book");
const Transaction = require("../models/Transaction");

// ✅ View all books
router.get("/books", protect, authorizeRoles("librarian"), async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ✅ View issued books
router.get("/issued", protect, authorizeRoles("librarian"), async (req, res) => {
  try {
    const issued = await Transaction.find({ status: "borrowed" })
      .populate("student", "name email")
      .populate("book", "title author");

    res.status(200).json(issued);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch issued books" });
  }
});

// ✅ View returned books
router.get("/returned", protect, authorizeRoles("librarian"), async (req, res) => {
  try {
    const returned = await Transaction.find({ status: "returned" })
      .populate("student", "name email")
      .populate("book", "title author");

    res.status(200).json(returned);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch returned books" });
  }
});

// ⛔ No permissions for adding/deleting books or managing users

module.exports = router;
