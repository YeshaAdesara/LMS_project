
"use client";
import { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    image: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/books", formData);
      setMessage("✅ Book added successfully!");
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        image: ""
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("❌ Failed to add book.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">📚 Admin Panel - Add Book</h1>

        {message && (
          <p className={`mb-4 text-center font-semibold ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book Title"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 border rounded"
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            ➕ Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
