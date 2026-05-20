const Transaction = require("../models/Transaction");
const Book = require("../models/Book");

exports.borrowBook = async (req, res) => {
  try {
    const { studentId, bookId } = req.body;

    // Validate book availability
    const book = await Book.findById(bookId);
    if (!book || book.status !== "available") {
      return res.status(400).json({ message: "Book not available" });
    }

    // Prevent duplicate active borrow
    const existing = await Transaction.findOne({
      student: studentId,
      book: bookId,
      status: { $in: ["borrowed", "overdue"] },
    });

    if (existing) {
      return res.status(400).json({ message: "Book already borrowed" });
    }

    // Create transaction
    const transaction = new Transaction({
      student: studentId,
      book: bookId,
      borrowDate: new Date(),
      status: "borrowed",
      fineAmount: 0,
    });

    await transaction.save();

    // Update book status to borrowed
    book.status = "borrowed";
    await book.save();

    res.status(201).json({ message: "Book borrowed successfully", transaction });
  } catch (error) {
    console.error("Borrow error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.returnBook = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId).populate("book");
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    if (transaction.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    // Mark transaction returned
    transaction.returnDate = new Date();
    transaction.status = "returned";
    // fineAmount remains as already calculated at view time or stored previously
    await transaction.save();

    // Make book available again
    if (transaction.book) {
      transaction.book.status = "available";
      await transaction.book.save();
    }

    res.status(200).json({ message: "Book returned successfully", transaction });
  } catch (error) {
    console.error("Return error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getStudentTransactions = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const loanPeriod = parseInt(process.env.LOAN_PERIOD_DAYS, 10) || 14;
    const finePerDay = parseInt(process.env.FINE_PER_DAY, 10) || 5;

    // Fetch transactions for the student and populate book info
    const transactions = await Transaction.find({ student: studentId })
      .populate("book", "title author image isbn status")
      .sort({ borrowDate: -1 });

    const now = new Date();

    // Build response objects with computed fields
    const result = transactions.map((tx) => {
      // Convert Mongoose doc to plain object to safely add fields
      const txObj = tx.toObject();

      // Default computed fields
      txObj.daysRemaining = null;
      txObj.overdueDays = 0;
      txObj.fineAmount = txObj.fineAmount || 0; // use stored fine if present

      // Only compute due/fine for borrowed/overdue transactions (not returned)
      if (txObj.status === "borrowed" || txObj.status === "overdue") {
        const borrowDate = new Date(txObj.borrowDate);
        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + loanPeriod);

        // compute difference in days (positive if dueDate in future)
        const msPerDay = 1000 * 60 * 60 * 24;
        // Use floor for overdueDays calculation, ceil for daysRemaining (so 1.1 days -> 2 days remaining)
        const diffMs = dueDate.setHours(0,0,0,0) - (new Date().setHours(0,0,0,0));
        const daysRemaining = Math.ceil(diffMs / msPerDay);

        if (daysRemaining <= 0) {
          // overdue
          const overdueDays = Math.abs(Math.floor((new Date().setHours(0,0,0,0) - (borrowDate.setDate(borrowDate.getDate() + loanPeriod),0)) / msPerDay)) || 0;
          // The above is a bit complex due to setDate mutating; simpler compute below:
          const dueDate2 = new Date(txObj.borrowDate);
          dueDate2.setDate(dueDate2.getDate() + loanPeriod);
          const overdueDaysCalc = Math.floor(( (new Date().setHours(0,0,0,0)) - (dueDate2.setHours(0,0,0,0)) ) / msPerDay);
          txObj.overdueDays = overdueDaysCalc > 0 ? overdueDaysCalc : 0;
          txObj.daysRemaining = 0;
          txObj.fineAmount = txObj.overdueDays * finePerDay;
          // mark status value returned in response as overdue (without saving to DB)
          txObj.status = "overdue";
        } else {
          // not overdue yet
          txObj.daysRemaining = daysRemaining;
          txObj.overdueDays = 0;
          txObj.fineAmount = 0;
        }
      } else {
        // returned transactions: keep any stored fineAmount and mark daysRemaining null
        txObj.daysRemaining = null;
        txObj.overdueDays = 0;
        // fineAmount stays as stored (often 0)
      }

      return txObj;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching student transactions:", error);
    res.status(500).json({ error: "Server error" });
  }
};
