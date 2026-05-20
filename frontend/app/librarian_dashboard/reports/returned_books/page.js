"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Mail, 
  CalendarContainer,
  Calendar 
} from "lucide-react";

export default function ReturnedBooks() {
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReturnedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports/returned");
      setReturnedBooks(res.data);
    } catch (error) {
      console.error("Failed to fetch returned books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturnedBooks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden flex flex-col">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-100/30 blur-[120px] pointer-events-none" />

      {/* 🔝 TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-100/40 px-6 py-4">
        <div className="max-w-3xl mx-auto w-full flex justify-between items-center">
          
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
                Archived Returns
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

      {/* 📘 MAIN CONTENT CONTENT WORKSPACE */}
      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* VIEW HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600" size={32} />
            Returned Books Ledger
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Historical settlement log showing inventory assets successfully received back into storage libraries.
          </p>
        </div>

        {/* LOADING & CONDITIONAL RENDERING PIPELINES */}
        {loading ? (
          <div className="text-center py-20">
            <div className="h-10 w-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-bold text-slate-500 animate-pulse">Polling returned catalog records...</p>
          </div>
        ) : returnedBooks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[24px] border border-dashed border-slate-200 shadow-sm mt-10">
            <CheckCircle2 className="mx-auto text-slate-300 mb-4" size={44} />
            <h3 className="text-base font-bold text-slate-800">No return instances compiled</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
              There are currently no recorded item entries registered inside the settled transaction indexes.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {returnedBooks.map((t) => (
              <div
                key={t._id}
                className="bg-white border border-slate-200 rounded-[22px] p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 animate-[slideUp_0.4s_ease-out]"
              >
                <div>
                  {/* CARD TITLE HEADER METADATA */}
                  <div className="mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md inline-flex items-center gap-1 mb-2">
                      <CheckCircle2 size={11} /> Settlement Complete
                    </span>
                    <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-2">
                      {t.book?.title}
                    </h2>
                  </div>

                  <hr className="border-slate-100 my-1" />

                  {/* USER AND DATETIME METADATA STACK */}
                  <div className="space-y-2.5 my-2">
                    <div className="flex items-start gap-2.5 text-xs text-slate-600 font-semibold">
                      <User size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider leading-none mb-0.5">Returned By</span>
                        <p className="text-slate-800 font-bold">{t.student?.name || "Unknown Student"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                      <Mail size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      <span className="truncate text-slate-500 font-semibold">{t.student?.email || "N/A"}</span>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-slate-600 font-medium pt-1 border-t border-slate-50">
                      <Calendar size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider leading-none mb-0.5">Processed On</span>
                        <p className="text-emerald-700 font-extrabold font-mono">
                          {t.returnDate ? new Date(t.returnDate).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
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