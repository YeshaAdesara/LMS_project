const Book = require("../models/Book");

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, category, image } = req.body;

    const existingBook = await Book.findOne({ isbn });
    if (existingBook)
      return res.status(400).json({ message: "Book with this ISBN already exists" });

    const book = new Book({
      title,
      author,
      isbn,
      category,
      image: image || ""
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ addedDate: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update entire book (admin use)
exports.updateBook = async (req, res) => {
  try {
    const { title, author, isbn, category, status, image } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, isbn, category, status, image },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book updated", book });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update only book status (for librarian)
exports.updateBookStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["available", "borrowed", "overdue", "returned"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book status updated", book });
  } catch (error) {
    console.error("Update status error:", error.message);
    res.status(500).json({ error: "Server error during status update" });
  }
};
