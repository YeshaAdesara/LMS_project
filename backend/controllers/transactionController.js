const Transaction = require("../models/Transaction");
const Book = require("../models/Book");

const calculateOverdueAndFine = (borrowDate) => {
  const loanPeriod = parseInt(process.env.LOAN_PERIOD_DAYS) || 14;
  const finePerDay = parseInt(process.env.FINE_PER_DAY) || 5;
  const dueDate = new Date(borrowDate);
  dueDate.setDate(dueDate.getDate() + loanPeriod);

  const now = new Date();
  if (now > dueDate) {
    const overdueDays = Math.ceil((now - dueDate) / (1000 * 60 * 60 * 24));
    const fine = overdueDays * finePerDay;
    return { status: "overdue", fine };
  }
  return { status: "borrowed", fine: 0 };
};

// ✅ Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { studentId, bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.status !== "available") {
      return res.status(400).json({ message: "Book not available" });
    }

    const transaction = new Transaction({
      student: studentId,
      book: bookId,
    });

    await transaction.save();

    book.status = "borrowed";
    await book.save();

    res.status(201).json({ message: "Book borrowed successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Return a book
exports.returnBook = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId).populate("book");
    if (!transaction || transaction.status !== "borrowed") {
      return res.status(400).json({ message: "Invalid transaction or already returned" });
    }

    // Mark transaction as returned
    transaction.status = "returned";
    transaction.returnDate = new Date();
    transaction.fineAmount = 0;
    await transaction.save();

    // Make book available again
    transaction.book.status = "available";
    await transaction.book.save();

    res.status(200).json({ message: "Book returned successfully", transaction });
  } catch (error) {
    console.error("Return error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ View student's transactions
exports.getStudentTransactions = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const transactions = await Transaction.find({ student: studentId })
      .populate("book", "title author")
      .sort({ borrowDate: -1 });

    for (const tx of transactions) {
      if (tx.status === "borrowed") {
        const { status, fine } = calculateOverdueAndFine(tx.borrowDate);
        if (status === "overdue") {
          tx.status = status;
          tx.fineAmount = fine;
          await tx.save();
        }
      }
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
