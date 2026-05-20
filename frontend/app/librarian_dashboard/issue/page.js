"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  ArrowLeft, 
  BookUp, 
  UserCheck, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function IssueBook() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [bookId, setBookId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await axios.get("http://localhost:5000/api/students");
        setStudents(studentsRes.data);

        const booksRes = await axios.get("http://localhost:5000/api/books");
        const availableBooks = booksRes.data.filter((book) => book.status === "available");
        setBooks(availableBooks);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();
    if (!studentId || !bookId) {
      setMessage("❌ Please select both student and book.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/transactions/borrow", {
        studentId,
        bookId,
      });

      setMessage("✅ Book issued successfully.");
      setStudentId("");
      setBookId("");
      
      // Refresh available books pool
      const booksRes = await axios.get("http://localhost:5000/api/books");
      const availableBooks = booksRes.data.filter((book) => book.status === "available");
      setBooks(availableBooks);
    } catch (err) {
      console.error("Issue error:", err?.response?.data || err.message);
      setMessage("❌ Failed to issue book.");
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
                Librarian Desk
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                Circulation Desk
              </h1>
            </div>
          </div>

          {/* BACK ACTION CONTROL */}
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

      {/* 📘 MAIN WRAPPER COMPONENT WORKSPACE */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-full max-w-xl bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          
          <div className="p-8 sm:p-10">
            
            {/* VIEW HEADER */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center mb-4">
                <BookUp size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Issue Catalog Resource
              </h2>
              <p className="text-slate-500 mt-1 text-sm font-medium">
                Create a new active circulation transaction log entry below
              </p>
            </div>

            {/* STATUS NOTIFICATION OVERLAY BANNER */}
            {message && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 mb-6 animate-[fadeIn_0.3s_ease-out] ${
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

            {/* CORE PIPELINE ACTION FORM */}
            <form onSubmit={handleIssue} className="space-y-5">
              
              {/* STUDENT SELECTION */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <UserCheck size={15} className="text-slate-400" />
                  Target Student
                </label>
                <div className="relative">
                  <select
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-4 py-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer font-medium text-sm shadow-inner"
                    required
                  >
                    <option value="">-- Choose a student identity --</option>
                    {students.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.email})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* BOOK SELECTION */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <BookOpen size={15} className="text-slate-400" />
                  Select Catalog Asset
                </label>
                <div className="relative">
                  <select
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    className="w-full px-4 py-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer font-medium text-sm shadow-inner"
                    required
                  >
                    <option value="">-- Choose an available book --</option>
                    {books.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.title} by {b.author}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* TRIGGER FORM SUBMISSION BUTTON */}
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
                      <BookUp size={16} />
                      <span>Commit Circulation Loan</span>
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

      {/* CORE CANVAS COMPONENT TIMINGS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}