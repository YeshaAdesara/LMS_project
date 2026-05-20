"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { 
  LibraryBig, 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  BookOpen, 
  Layers, 
  Activity,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function AdminBooksPage() {
  const [books, setBooks] = useState([]);
  const [isDeletingId, setIsDeletingId] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  const handleDelete = async (bookId) => {
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    try {
      setIsDeletingId(bookId);
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      alert("Book deleted successfully");
      fetchBooks();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete book");
    } finally {
      setIsDeletingId(null);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
                Master Inventory
              </h1>
            </div>
          </div>

          {/* BACK TO DASHBOARD */}
          <Link href="/admin_dashboard" className="h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]">
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>

        </div>
      </header>

      {/* 📘 MAIN CONTENT MESH AREA */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* VIEW HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Manage Catalog Assets
            </h2>
            <p className="text-slate-500 mt-1 text-sm font-medium">
              View records, edit dynamic item configurations, or delete old collections.
            </p>
          </div>
          <Link href="/admin_dashboard/add" className="h-11 px-5 rounded-xl text-sm font-bold bg-slate-900 text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10 active:scale-[0.98] flex items-center justify-center self-start sm:self-auto">
            + Add New Asset
          </Link>
        </div>

        {/* DATA CONTAINER BOARD */}
        <div className="bg-white border border-slate-200 rounded-[24px] shadow-2xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm font-medium">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-4 pl-6 flex items-center gap-2"><BookOpen size={14} /> Title</th>
                  <th className="p-4">Author</th>
                  <th className="p-4"><Layers size={14} className="inline mr-1" /> Category</th>
                  <th className="p-4"><Activity size={14} className="inline mr-1" /> Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {books.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16 text-slate-400 bg-white">
                      <LibraryBig className="mx-auto mb-3 text-slate-300" size={36} />
                      <p className="font-bold text-slate-800 text-base">No assets registered</p>
                      <p className="text-xs text-slate-400 mt-0.5">The library workspace records catalog is empty.</p>
                    </td>
                  </tr>
                ) : (
                  books.map((book) => {
                    const isAvailable = book.status?.toLowerCase() === "available";
                    return (
                      <tr key={book._id} className="transition-colors hover:bg-slate-50/50 group">
                        {/* TITLE ROW */}
                        <td className="p-4 pl-6 font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors max-w-xs truncate">
                          {book.title}
                        </td>
                        {/* AUTHOR ROW */}
                        <td className="p-4 font-semibold text-slate-600">{book.author}</td>
                        {/* CATEGORY ROW */}
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 border border-slate-200/60 text-slate-600">
                            {book.category || "General"}
                          </span>
                        </td>
                        {/* STATUS BADGE ROW */}
                        <td className="p-4">
                          {isAvailable ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                              <CheckCircle2 size={12} /> Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                              <XCircle size={12} /> Out of Stock
                            </span>
                          )}
                        </td>
                        {/* ACTIONS CONTROLS */}
                        <td className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin_dashboard/update/${book._id}`}
                              className="h-9 px-3 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <Edit3 size={13} />
                              <span>Update</span>
                            </Link>
                            <button
                              disabled={isDeletingId === book._id}
                              onClick={() => handleDelete(book._id)}
                              className="h-9 px-3 rounded-xl text-xs font-bold border border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-[0.97] flex items-center justify-center gap-1.5 disabled:opacity-50"
                            >
                              {isDeletingId === book._id ? (
                                <div className="h-3 w-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <>
                                  <Trash2 size={13} />
                                  <span>Delete</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
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