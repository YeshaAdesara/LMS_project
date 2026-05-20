"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  ArrowLeft, 
  BookDown, 
  User, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Undo2 
} from "lucide-react";

export default function ReturnBook() {
  const [borrowed, setBorrowed] = useState([]);
  const [message, setMessage] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const router = useRouter();

  const fetchBorrowed = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports/issued");
      setBorrowed(res.data);
    } catch (err) {
      console.error("Error fetching issued books:", err);
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, []);

  const handleReturn = async (transactionId) => {
    const confirm = window.confirm("Mark this book as returned?");
    if (!confirm) return;

    console.log("Returning book with transaction ID:", transactionId);
    setProcessingId(transactionId);

    try {
      await axios.put(
        `http://localhost:5000/api/transactions/return/${transactionId}`
      );
      setMessage("✅ Book returned successfully");
      fetchBorrowed(); // Refresh list
    } catch (err) {
      console.error("Return error:", err?.response?.data || err.message);
      setMessage("❌ Failed to return book.");
    } finally {
      setProcessingId(null);
    }
  };

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
                Librarian Desk
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                Process Returns
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

      {/* 📘 MAIN CONTENT WORKSPACE AREA */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* VIEW HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BookDown className="text-indigo-600" size={32} />
            Check-In Borrowed Books
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Scan and look up items currently designated on loan to process incoming collection returns.
          </p>
        </div>

        {/* DYNAMIC OPERATION RESPONSE BANNER */}
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

        {/* COLLECTION DISPATCHED RETRIEVAL LOOPS */}
        {borrowed.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[24px] border border-dashed border-slate-200 shadow-sm">
            <BookDown className="mx-auto text-slate-300 mb-4" size={44} />
            <h3 className="text-base font-bold text-slate-800">No active book loans</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
              There are currently no distributed physical library assets requiring check-in processing.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 w-full">
            {borrowed.map((t) => {
              const isCurrentProcessing = processingId === t._id;
              
              return (
                <div
                  key={t._id}
                  className="bg-white border border-slate-200 rounded-[22px] p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 animate-[slideUp_0.4s_ease-out]"
                >
                  {/* LEFT DETAILS STACK */}
                  <div className="space-y-2.5 flex-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md border border-slate-200/60 inline-block mb-1.5">
                        Circulated Copy
                      </span>
                      <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-1">
                        {t.book?.title}
                      </h2>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 font-semibold pt-0.5">
                      <span className="flex items-center gap-1">
                        <User size={13} className="text-slate-400 shrink-0" />
                        <span>Patron: <strong className="text-slate-700 font-bold">{t.student?.name || "Unknown"}</strong></span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 font-medium">
                        <Mail size={13} className="shrink-0" />
                        <span className="truncate max-w-[180px]">{t.student?.email || "N/A"}</span>
                      </span>
                      <span className="flex items-center gap-1 border-l border-slate-200 pl-4 font-bold text-slate-600">
                        <Calendar size={13} className="text-slate-400 shrink-0" />
                        <span>Issued: {t.borrowDate ? new Date(t.borrowDate).toLocaleDateString() : "N/A"}</span>
                      </span>
                    </div>
                  </div>

                  {/* RIGHT ACTION COMPONENT PANEL */}
                  <div className="shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-50 flex justify-end">
                    <button
                      disabled={isCurrentProcessing}
                      onClick={() => handleReturn(t._id)}
                      className="w-full md:w-auto h-11 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-slate-900 text-white transition-all duration-200 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/10 active:scale-[0.97] disabled:opacity-40"
                    >
                      {isCurrentProcessing ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Undo2 size={14} />
                          <span>Check In Asset</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* CORE FRAME LAYOUT TRANSITIONS */}
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