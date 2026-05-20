const express = require("express");
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateBookStatus // ✅ New
} = require("../controllers/bookController");

// Add a new book
router.post("/", addBook);

// Get all books
router.get("/", getAllBooks);

// Get one book by ID
router.get("/:id", getBookById);

// Update entire book by ID (admin)
router.put("/:id", updateBook);

// Update only book status (librarian)
router.put("/:id/status", updateBookStatus); // ✅ New

// Delete book by ID
router.delete("/:id", deleteBook);

module.exports = router;
