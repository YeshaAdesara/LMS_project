const express = require("express");
const router = express.Router();
const {
  getMostBorrowedBooks,
  getTopBorrowers,
  getOverdueTransactions
} = require("../controllers/reportController");

// GET /api/reports/most-borrowed
router.get("/most-borrowed", getMostBorrowedBooks);

// GET /api/reports/top-borrowers
router.get("/top-borrowers", getTopBorrowers);

// GET /api/reports/overdue
router.get("/overdue", getOverdueTransactions);

module.exports = router;
