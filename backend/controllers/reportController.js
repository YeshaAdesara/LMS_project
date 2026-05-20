
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const User = require("../models/User");

// 1. Most Borrowed Books
exports.getMostBorrowedBooks = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $group: { _id: "$book", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails"
        }
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          title: "$bookDetails.title",
          author: "$bookDetails.author",
          count: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 2. Top Borrowers
exports.getTopBorrowers = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $group: { _id: "$student", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "studentDetails"
        }
      },
      { $unwind: "$studentDetails" },
      {
        $project: {
          _id: 0,
          name: "$studentDetails.name",
          email: "$studentDetails.email",
          count: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 3. Overdue Transactions
exports.getOverdueTransactions = async (req, res) => {
  try {
    const overdue = await Transaction.find({ status: "overdue" })
      .populate("student", "name email")
      .populate("book", "title author");

    res.status(200).json(overdue);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 4. All Currently Borrowed Books
exports.getIssuedBooks = async (req, res) => {
  try {
    const issued = await Transaction.find({ status: "borrowed" })
      .populate("student", "name email")
      .populate("book", "title author");

    res.status(200).json(issued);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 5. All Returned Books
exports.getReturnedBooks = async (req, res) => {
  try {
    const returned = await Transaction.find({ status: "returned" })
      .populate("student", "name email")
      .populate("book", "title author");

    res.status(200).json(returned);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 6. Total Fine Collected
exports.getTotalFineCollected = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalFine: { $sum: "$fineAmount" }
        }
      }
    ]);

    const totalFine = result[0]?.totalFine || 0;
    res.status(200).json({ totalFine });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
