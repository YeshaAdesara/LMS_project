const Book = require("../models/Book");

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, category, image } = req.body;

    // Check for duplicate ISBN
    const existingBook = await Book.findOne({ isbn });
    if (existingBook)
      return res.status(400).json({ message: "Book with this ISBN already exists" });

    const book = new Book({
      title,
      author,
      isbn,
      category,
      image: image || "" // ← added image support
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

// Update book
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
