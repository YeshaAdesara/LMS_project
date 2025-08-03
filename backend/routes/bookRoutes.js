const express = require("express");
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

// Add a new book
router.post("/", addBook);

// Get all books
router.get("/", getAllBooks);

// Get one book by ID
router.get("/:id", getBookById);

// Update book by ID
router.put("/:id", updateBook);

// Delete book by ID
router.delete("/:id", deleteBook);

module.exports = router;
