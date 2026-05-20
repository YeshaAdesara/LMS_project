"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LibraryBig, 
  ArrowLeft, 
  FileEdit, 
  Book, 
  User, 
  Hash, 
  Activity, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function EditBookStatus() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const router = useRouter();

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err.message);
    }
  };

  const handleStatusChange = async (bookId, newStatus) => {
    try {
      setUpdatingId(bookId);
      await axios.put(`http://localhost:5000/api/books/${bookId}/status`, {
        status: newStatus,
      });
      setMessage("✅ Book status updated successfully!");
      fetchBooks(); // Refresh list
    } catch (err) {
      console.error("Error updating book status:", err.message);
      setMessage("❌ Failed to update status.");
    } finally {
      setUpdatingId(null);
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
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
          
          {/* BRANDING LOGO */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-900 shadow-sm border border-slate-800">
              <LibraryBig size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-indigo-600 leading-none mb-1">
                Librarian Console
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                Batch Status Modifier
              </h1>
            </div>
          </div>

          {/* BACK TO DASHBOARD */}
          <button
            type="button"
            onClick={() => router.back()}
            className="h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

        </div>
      </header>

      {/* 📘 MAIN WORKSPACE CONTENT */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* VIEW HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <FileEdit className="text-indigo-600" size={32} />
            Update Asset Statuses
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Perform line-item lifecycle state adaptations across active library collections.
          </p>
        </div>

        {/* DYNAMIC OPERATION RESPONSE BANNER */}
        {message && (
          <div className={`p-4 rounded-xl border flex items-start gap-3 mb-6 animate-[fadeIn_0.3s_ease-out] max-w-4xl ${
            message.includes("✅") 
              ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
              : "bg-red-50 border-red-100 text-red-800"
          }`}>
            {message.includes("✅") ? (
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            )}
            <p className="text-xs font-bold leading-tight pt-0.5">
              {message.replace(/[\u2705\u274C]\s*/, "")}
            </p>
          </div>
        )}

        {/* CONDITION STATE MAPPING LIST */}
        {books.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[24px] border border-dashed border-slate-200 shadow-sm">
            <LibraryBig className="mx-auto text-slate-300 mb-4" size={44} />
            <h3 className="text-base font-bold text-slate-800">No catalogue entries compiled</h3>
            <p className="text-sm text-slate-400 mt-1">There are currently zero tracked book resources assigned to this server stack.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {books.map((book) => {
              const isCurrentUpdating = updatingId === book._id;
              
              return (
                <div
                  key={book._id}
                  className="bg-white border border-slate-200 rounded-[22px] p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 animate-[slideUp_0.4s_ease-out]"
                >
                  {/* LEFT: METADATA SPECS CONTAINER */}
                  <div className="space-y-2 flex-1">
                    <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-2">
                      {book.title}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <User size={13} className="text-slate-400" />
                        <span>By <strong className="text-slate-700 font-bold">{book.author}</strong></span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Hash size={13} className="text-slate-400" />
                        <span>ISBN: <strong className="text-slate-600 font-mono">{book.isbn}</strong></span>
                      </span>
                    </div>
                  </div>

                  {/* RIGHT: INTERACTIVE CONTROL COMPONENT PANEL */}
                  <div className="w-full md:w-64 shrink-0 flex items-center gap-3 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        {isCurrentUpdating ? (
                          <div className="h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Activity size={15} />
                        )}
                      </div>
                      <select
                        disabled={isCurrentUpdating}
                        value={book.status}
                        onChange={(e) => handleStatusChange(book._id, e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="available">Available</option>
                        <option value="borrowed">Borrowed</option>
                        <option value="overdue">Overdue</option>
                        <option value="returned">Returned</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* CORE PIPELINE TRANSITIONS SCHEMA */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}