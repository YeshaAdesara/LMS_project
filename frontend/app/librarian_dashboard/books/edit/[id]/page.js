"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
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
  AlertCircle, 
  Save 
} from "lucide-react";

export default function EditBookStatusPage() {
  const router = useRouter();
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch the book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };
    if (id) fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await axios.put(`http://localhost:5000/api/books/${id}`, {
        status,
      });
      setMessage("✅ Book status updated successfully!");
      router.push("/librarian_dashboard/books");
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Failed to update book status.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="h-10 w-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Reading catalog records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden flex flex-col">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-100/30 blur-[120px] pointer-events-none" />

      {/* 🔝 TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-100/40 px-6 py-4">
        <div className="max-w-xl mx-auto w-full flex justify-between items-center">
          
          {/* BRANDING LOGO */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-900 shadow-sm border border-slate-800">
              <LibraryBig size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-indigo-600 leading-none mb-1">
                Librarian Terminal
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                Status Manager
              </h1>
            </div>
          </div>

          {/* BACK TO BOOKS PLATFORM */}
          <button
            type="button"
            onClick={() => router.push("/librarian_dashboard/books")}
            className="h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            <span>Back to Books</span>
          </button>

        </div>
      </header>

      {/* 📘 MAIN CONTAINER ACCENT AREA */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-full max-w-xl bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          
          <div className="p-8 sm:p-10">
            
            {/* VIEW HEADER */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center mb-4">
                <FileEdit size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Update Asset Status
              </h2>
              <p className="text-slate-500 mt-1 text-sm font-medium">
                Modify circulation flow properties for the selected collection piece
              </p>
            </div>

            {/* DYNAMIC FEEDBACK BANNER */}
            {message && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 mb-5 animate-[fadeIn_0.3s_ease-out] ${
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

            {/* STATIC READONLY METADATA MATRIX */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 mb-6 space-y-3 text-sm font-medium">
              <div className="flex items-start gap-3">
                <Book size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider leading-none mb-1">Title</span>
                  <p className="text-slate-900 font-extrabold leading-tight">{book.title}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 border-t border-slate-200/50 pt-2.5">
                <User size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider leading-none mb-1">Author</span>
                  <p className="text-slate-700 font-bold leading-tight">{book.author}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-200/50 pt-2.5">
                <Hash size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider leading-none mb-1">ISBN Reference</span>
                  <p className="text-slate-600 font-semibold leading-tight font-mono">{book.isbn}</p>
                </div>
              </div>
            </div>

            {/* ACTION PIPELINE FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* STATUS SELECT */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Circulation Status State</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Activity size={18} className="text-slate-400" />
                  </div>
                  <select
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer font-bold text-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* SAVE ACTION TRIGGER */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full h-14 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSaving ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Update Status</span>
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

      {/* TRANSITIONS AND KEYFRAME TIMINGS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}