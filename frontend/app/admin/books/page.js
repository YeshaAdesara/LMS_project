"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to fetch books", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      alert("✅ Book deleted");
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 All Books (Admin)</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-600">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white p-4 rounded shadow border flex flex-col"
            >
              <img
                src={book.image || "https://via.placeholder.com/150"}
                alt={book.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
              <p className="text-sm text-gray-600 mb-1">ISBN: {book.isbn}</p>
              <p className="text-sm text-gray-600 mb-3">Category: {book.category}</p>

              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
