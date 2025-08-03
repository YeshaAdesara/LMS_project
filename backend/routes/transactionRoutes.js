const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getStudentTransactions,
} = require("../controllers/transactionController");

// 📚 Borrow a book
router.post("/borrow", borrowBook);

// 🔁 Return a book by transaction ID
router.put("/return/:transactionId", returnBook);

// 📜 View transactions for a student
router.get("/student/:studentId", getStudentTransactions);

module.exports = router;
