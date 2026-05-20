"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  ArrowLeft, 
  BarChart3, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Coins,
  User,
  Mail,
  Calendar
} from "lucide-react";

export default function LibrarianReports() {
  const [borrowed, setBorrowed] = useState([]);
  const [returned, setReturned] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [fine, setFine] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [borrowedRes, returnedRes, overdueRes, fineRes] = await Promise.all([
          axios.get("http://localhost:5000/api/reports/issued"),
          axios.get("http://localhost:5000/api/reports/returned"),
          axios.get("http://localhost:5000/api/reports/overdue"),
          axios.get("http://localhost:5000/api/reports/fines"),
        ]);

        setBorrowed(borrowedRes.data);
        setReturned(returnedRes.data);
        setOverdue(overdueRes.data);
        setFine(fineRes.data.totalFine);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const SectionCard = ({ title, icon, count, children }) => (
    <div className="bg-white border border-slate-200/90 rounded-[22px] p-6 shadow-sm flex flex-col transition-all duration-200 hover:shadow-md animate-[slideUp_0.4s_ease-out]">
      <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="text-indigo-600 shrink-0">{icon}</div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">{title}</h2>
        </div>
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/40">
          {count} items
        </span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1 scrollbar">
        {children}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="h-10 w-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Compiling operational report assets...</p>
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
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* BRANDING LOGO */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-900 shadow-sm border border-slate-800">
              <LibraryBig size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-indigo-600 leading-none mb-1">
                Librarian Workspace
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                System Analytics
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

      {/* 📘 MAIN ANALYTICS WORKSPACE */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* VIEW HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <BarChart3 className="text-indigo-600" size={32} />
              Operational Reports Overview
            </h2>
            <p className="text-slate-500 mt-1 text-sm font-medium">
              Real-time synchronization maps tracking active distributions, collections settlements, and late-return audits.
            </p>
          </div>

          {/* TOTAL FINE HERO WIDGET */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm min-w-[220px] flex items-center gap-4 animate-[slideUp_0.5s_ease-out]">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <Coins size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-1.5">
                Total Fines Audited
              </p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                ₹{fine}
              </h3>
            </div>
          </div>
        </div>

        {/* ANALYTICS REPORT SECTIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CURRENTLY BORROWED */}
          <SectionCard title="Currently Borrowed" icon={<BookOpen size={18} />} count={borrowed.length}>
            {borrowed.length === 0 ? (
              <p className="text-xs font-semibold text-slate-400 text-center py-8">No books currently borrowed.</p>
            ) : (
              borrowed.map((b) => (
                <div key={b._id} className="p-4 rounded-xl border border-slate-200/60 bg-slate-50/40 space-y-2">
                  <p className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight line-clamp-1">
                    {b.book?.title}
                  </p>
                  <div className="space-y-1 text-xs text-slate-500 font-medium">
                    <p className="flex items-center gap-1.5"><User size={13} className="text-slate-400" /> <span className="truncate">{b.student?.name}</span></p>
                    <p className="flex items-center gap-1.5"><Mail size={13} className="text-slate-400" /> <span className="truncate text-slate-400">{b.student?.email}</span></p>
                    <p className="flex items-center gap-1.5 pt-1 border-t border-slate-100 font-semibold"><Calendar size={13} className="text-slate-400" /> <span>Out: {new Date(b.borrowDate).toLocaleDateString()}</span></p>
                  </div>
                </div>
              ))
            )}
          </SectionCard>

          {/* RETURNED BOOKS */}
          <SectionCard title="Returned Books Ledger" icon={<CheckCircle2 size={18} />} count={returned.length}>
            {returned.length === 0 ? (
              <p className="text-xs font-semibold text-slate-400 text-center py-8">No books returned yet.</p>
            ) : (
              returned.map((r) => (
                <div key={r._id} className="p-4 rounded-xl border border-slate-200/60 bg-slate-50/40 space-y-2">
                  <p className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight line-clamp-1">
                    {r.book?.title}
                  </p>
                  <div className="space-y-1 text-xs text-slate-500 font-medium">
                    <p className="flex items-center gap-1.5"><User size={13} className="text-slate-400" /> <span className="truncate">{r.student?.name}</span></p>
                    <p className="flex items-center gap-1.5"><Mail size={13} className="text-slate-400" /> <span className="truncate text-slate-400">{r.student?.email}</span></p>
                    <p className="flex items-center gap-1.5 pt-1 border-t border-slate-100 font-extrabold text-emerald-700"><Calendar size={13} className="text-slate-400" /> <span>In: {new Date(r.returnDate).toLocaleDateString()}</span></p>
                  </div>
                </div>
              ))
            )}
          </SectionCard>

          {/* OVERDUE TRANSACTIONS */}
          <SectionCard title="Overdue Transactions" icon={<AlertTriangle size={18} />} count={overdue.length}>
            {overdue.length === 0 ? (
              <p className="text-xs font-semibold text-emerald-600 text-center py-8 bg-emerald-50/40 rounded-xl border border-emerald-100/50">✓ Zero overdue instances audited.</p>
            ) : (
              overdue.map((o) => (
                <div key={o._id} className="p-4 rounded-xl border border-red-100 bg-red-50/10 space-y-2">
                  <p className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight line-clamp-1">
                    {o.book?.title}
                  </p>
                  <div className="space-y-1 text-xs text-slate-500 font-medium">
                    <p className="flex items-center gap-1.5"><User size={13} className="text-slate-400" /> <span className="truncate">{o.student?.name}</span></p>
                    <p className="flex items-center gap-1.5"><Mail size={13} className="text-slate-400" /> <span className="truncate text-slate-400">{o.student?.email}</span></p>
                    <div className="flex items-center justify-between pt-1 border-t border-red-100/50 mt-1">
                      <p className="flex items-center gap-1.5 text-slate-400 font-medium"><Calendar size={13} /> <span>Out: {new Date(o.borrowDate).toLocaleDateString()}</span></p>
                      <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-100">Overdue</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </SectionCard>

        </div>
      </main>

      {/* CORE SCROLLBAR AND TIMINGS LAYOUTS */}
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
        .scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}