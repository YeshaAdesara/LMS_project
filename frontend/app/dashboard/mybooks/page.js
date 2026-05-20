"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  ArrowLeft, 
  BookMarked, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Coins, 
  Undo2 
} from "lucide-react";

export default function MyBooks() {
  const [token, setToken] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [returnLoadingId, setReturnLoadingId] = useState(null);
  const router = useRouter();

  // Fetch student transactions
  const fetchTransactions = async (studentId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/transactions/student/${studentId}`
      );
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch student transactions", err);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      window.location.href = "/"; // redirect to welcome page
    } else {
      setToken(storedToken);
      const decoded = jwt_decode(storedToken);
      fetchTransactions(decoded.id);
    }
  }, []);

  // Calculate days remaining or overdue days
  const calculateDaysInfo = (borrowDate, loanPeriodDays) => {
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + loanPeriodDays);

    const now = new Date();
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { overdue: true, days: Math.abs(diffDays) };
    }
    return { overdue: false, days: diffDays };
  };

  // Handle book return
  const handleReturn = async (transactionId) => {
    try {
      setReturnLoadingId(transactionId);
      await axios.put(
        `http://localhost:5000/api/transactions/return/${transactionId}`
      );

      alert("✅ Book returned successfully!");

      const decoded = jwt_decode(token);
      fetchTransactions(decoded.id);
    } catch (error) {
      console.error("Return failed:", error.response?.data || error.message);
      alert("❌ Could not return the book.");
    } finally {
      setReturnLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      
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
                Student Workspace
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                My Digital Ledger
              </h1>
            </div>
          </div>

          {/* BACK TO CATALOG BUTTON */}
          <button
            onClick={() => router.push("/dashboard")}
            className="h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            <span>Back to Catalog</span>
          </button>

        </div>
      </header>

      {/* 📘 MAIN CONTENT WORKSPACE */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* VIEW HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BookMarked className="text-indigo-600" size={32} />
            My Borrowed Books
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Monitor due dates, outstanding system clearances, and pending book returns.
          </p>
        </div>

        {transactions.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm max-w-xl mx-auto mt-10">
            <BookMarked className="mx-auto text-slate-300 mb-4" size={44} />
            <h3 className="text-base font-bold text-slate-800">No active book loans</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
              You haven't borrowed any system assets yet. Head back to the discovery portal to pick a book.
            </p>
          </div>
        ) : (
          /* TRANSACTION GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions
              .filter((tx) => tx.book)
              .map((tx) => {
                const daysInfo = calculateDaysInfo(
                  tx.borrowDate,
                  tx.loanPeriodDays || 14
                );
                const isReturned = tx.status === "returned";
                const isCurrentLoading = returnLoadingId === tx._id;

                return (
                  <div
                    key={tx._id}
                    className={`relative bg-white border rounded-[22px] p-5 flex flex-col shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 animate-[slideUp_0.5s_ease-out] ${
                      !isReturned && daysInfo.overdue 
                        ? "border-red-200 bg-gradient-to-b from-white to-red-50/10" 
                        : "border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    {/* BOOK DESCRIPTION ACCENT HEADER */}
                    <div className="mb-4">
                      <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-2">
                        {tx.book.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">
                        by <span className="text-slate-700 font-bold">{tx.book.author}</span>
                      </p>
                    </div>

                    <hr className="border-slate-100 my-1 mb-4" />

                    {/* METADATA SUMMARY */}
                    <div className="space-y-2.5 flex-1 mb-6">
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Calendar size={14} className="text-slate-400" />
                        <span>Borrowed: <strong>{new Date(tx.borrowDate).toLocaleDateString()}</strong></span>
                      </div>

                      {/* STATUS DISPLAY ENGINE */}
                      {isReturned ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100/80 shadow-sm mt-1">
                          <CheckCircle2 size={13} /> Returned &amp; Verified
                        </div>
                      ) : (
                        <div className="space-y-2 mt-1">
                          {daysInfo.overdue ? (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100 shadow-sm">
                              <AlertTriangle size={13} /> Overdue by {daysInfo.days} days
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/80 shadow-sm">
                              <Calendar size={13} /> {daysInfo.days} days remaining
                            </div>
                          )}

                          {/* OVERDUE ACCELERATED FINES */}
                          {daysInfo.overdue && tx.fineAmount > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-red-700 font-extrabold bg-red-100/50 p-2.5 rounded-xl border border-red-100 animate-[fadeIn_0.3s_ease-out]">
                              <Coins size={14} />
                              <span>Outstanding Fine: ₹{tx.fineAmount}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* RETURN ACTION TRIGGER */}
                    {!isReturned && (
                      <button
                        disabled={isCurrentLoading}
                        onClick={() => handleReturn(tx._id)}
                        className={`w-full h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 border shadow-sm ${
                          daysInfo.overdue
                            ? "bg-red-600 border-red-700 text-white hover:bg-red-700 hover:shadow-red-600/10 active:scale-[0.97]"
                            : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-[0.97]"
                        }`}
                      >
                        {isCurrentLoading ? (
                          <div className={`h-4 w-4 border-2 rounded-full animate-spin ${daysInfo.overdue ? "border-white/30 border-t-white" : "border-slate-300 border-t-slate-800"}`} />
                        ) : (
                          <>
                            <Undo2 size={14} />
                            <span>Return Asset</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        )}

      </main>

      {/* CORE FRAME TRANSITIONS */}
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