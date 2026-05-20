
const express = require("express");
const router = express.Router();
const {
  getMostBorrowedBooks,
  getTopBorrowers,
  getOverdueTransactions,
  getIssuedBooks,
  getReturnedBooks,
  getTotalFineCollected
} = require("../controllers/reportController");

// Existing Reports
router.get("/most-borrowed", getMostBorrowedBooks);
router.get("/top-borrowers", getTopBorrowers);
router.get("/overdue", getOverdueTransactions);

// New Reports
router.get("/issued", getIssuedBooks);               // All borrowed
router.get("/returned", getReturnedBooks);           // All returned
router.get("/total-fine", getTotalFineCollected);    // Total fine

module.exports = router;
