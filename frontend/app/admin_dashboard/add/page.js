"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  ArrowLeft, 
  BookPlus, 
  Book, 
  User, 
  Hash, 
  Tag, 
  Image as ImageIcon 
} from "lucide-react";

export default function AddBookPage() {
  const [form, setForm] = useState({ 
    title: "",
    author: "",
    isbn: "",
    category: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/books", form);
      alert("✅ Book added successfully!");
      router.push("/admin_dashboard");
    } catch (error) {
      console.error("Add book error:", error.response?.data || error.message);
      alert("❌ Failed to add book.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden flex flex-col">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-100/30 blur-[120px] pointer-events-none" />

      {/* 🔝 TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-100/40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* BRANDING LOGO */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-900 shadow-sm border border-slate-800">
              <LibraryBig size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-indigo-600 leading-none mb-1">
                Admin Workspace
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                Catalog Inventory
              </h1>
            </div>
          </div>

          {/* BACK TO DASHBOARD */}
          <button
            onClick={() => router.push("/admin_dashboard")}
            className="h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>

        </div>
      </header>

      {/* 📘 MAIN CONTAINER ACCENT WORKSPACE */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-full max-w-xl bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          
          <div className="p-8 sm:p-10">
            
            {/* VIEW HEADER */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center mb-4">
                <BookPlus size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Add New Catalog Asset
              </h2>
              <p className="text-slate-500 mt-1 text-sm font-medium">
                Input complete metadata properties to register a new book instance
              </p>
            </div>

            {/* FORM PIPELINE */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* BOOK TITLE */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Book Title</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Book size={18} className="text-slate-400" />
                  </div>
                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g., Introduction to Quantum Physics"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              {/* AUTHOR */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Author Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                  </div>
                  <input
                    name="author"
                    type="text"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="e.g., Richard Feynman"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ISBN */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">ISBN Code</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Hash size={18} className="text-slate-400" />
                    </div>
                    <input
                      name="isbn"
                      type="text"
                      value={form.isbn}
                      onChange={handleChange}
                      placeholder="978-3-16-148410-0"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* CATEGORY */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Category</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Tag size={18} className="text-slate-400" />
                    </div>
                    <input
                      name="category"
                      type="text"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="e.g., Physics, Fiction"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* IMAGE URL */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Book Cover Image URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ImageIcon size={18} className="text-slate-400" />
                  </div>
                  <input
                    name="image"
                    type="url"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://example.com/cover.jpg"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                  />
                </div>
              </div>

              {/* SUBMIT PROCESS BUTTON */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <BookPlus size={18} />
                      Commit Asset Data
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* BOTTOM ACCENT BAR */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-blue-500" />
        </div>
      </main>

      {/* STYLES & FRAME TIMINGS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}