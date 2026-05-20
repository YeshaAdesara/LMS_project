"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { 
  LibraryBig, 
  ArrowLeft, 
  BarChart3, 
  BookOpen, 
  Users, 
  AlertTriangle, 
  Bookmark, 
  CheckCircle2, 
  Coins 
} from "lucide-react";

export default function ReportsPage() {
  const [mostBorrowed, setMostBorrowed] = useState([]);
  const [topBorrowers, setTopBorrowers] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [issued, setIssued] = useState([]);
  const [returned, setReturned] = useState([]);
  const [fineTotal, setFineTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const [mb, tb, od, isd, ret, fine] = await Promise.all([
        axios.get("http://localhost:5000/api/reports/most-borrowed"),
        axios.get("http://localhost:5000/api/reports/top-borrowers"),
        axios.get("http://localhost:5000/api/reports/overdue"),
        axios.get("http://localhost:5000/api/reports/issued"),
        axios.get("http://localhost:5000/api/reports/returned"),
        axios.get("http://localhost:5000/api/reports/total-fine"),
      ]);

      setMostBorrowed(mb.data);
      setTopBorrowers(tb.data);
      setOverdue(od.data);
      setIssued(isd.data);
      setReturned(ret.data);
      setFineTotal(fine.data.totalFine);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const Section = ({ title, icon, children }) => (
    <div className="bg-white border border-slate-200/90 rounded-[22px] p-6 shadow-sm flex flex-col transition-all duration-200 hover:shadow-md animate-[slideUp_0.4s_ease-out]">
      <div className="flex items-center gap-2.5 mb-5 border-b border-slate-100 pb-3">
        <div className="text-indigo-600 shrink-0">
          {icon}
        </div>
        <h2 className="text-base font-extrabold text-slate-900 tracking-tight">{title}</h2>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto max-h-[360px] pr-1 scrollbar">
        {children}
      </div>
    </div>
  );

  const ReportCard = ({ title, subtitle, details, badgeText, isOverdue }) => (
    <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-colors hover:bg-slate-50/50 ${
      isOverdue ? "bg-red-50/20 border-red-100" : "bg-slate-50/40 border-slate-200/60"
    }`}>
      <div>
        <p className="text-sm font-extrabold text-slate-900 tracking-tight">{title}</p>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="text-left sm:text-right shrink-0">
        <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg ${
          isOverdue 
            ? "bg-red-50 text-red-700 border border-red-100" 
            : "bg-indigo-50 text-indigo-700 border border-indigo-100/50"
        }`}>
          {details}
        </span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="h-10 w-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-600 animate-pulse">Aggregating system report assets...</p>
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
                Management Console
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                System Analytics
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

      {/* 📘 MAIN ANALYTICS WORKSPACE */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* VIEW HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <BarChart3 className="text-indigo-600" size={32} />
              Library Operational Reports
            </h2>
            <p className="text-slate-500 mt-1 text-sm font-medium">
              Real-time multi-vector analysis across collections, users, financial audits, and circulation logs.
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
                ₹{fineTotal}
              </h3>
            </div>
          </div>
        </div>

        {/* ANALYTICS REPORT SECTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* MOST BORROWED BOOKS */}
          <Section title="Most Borrowed Books" icon={<BookOpen size={18} />}>
            {mostBorrowed.length === 0 ? (
              <p className="text-xs font-semibold text-slate-400 text-center py-6">No tracking data optimized.</p>
            ) : (
              mostBorrowed.map((item, idx) => (
                <ReportCard
                  key={idx}
                  title={item.title}
                  subtitle={`Author: ${item.author}`}
                  details={`Borrowed ${item.count}x`}
                />
              ))
            )}
          </Section>

          {/* TOP BORROWERS */}
          <Section title="Top System Borrowers" icon={<Users size={18} />}>
            {topBorrowers.length === 0 ? (
              <p className="text-xs font-semibold text-slate-400 text-center py-6">No user data aggregated.</p>
            ) : (
              topBorrowers.map((item, idx) => (
                <ReportCard
                  key={idx}
                  title={item.name}
                  subtitle={item.email}
                  details={`${item.count} loans`}
                />
              ))
            )}
          </Section>

          {/* OVERDUE TRANSACTIONS */}
          <Section title="Overdue Transactions" icon={<AlertTriangle size={18} />}>
            {overdue.length === 0 ? (
              <p className="text-xs font-semibold text-emerald-600 text-center py-6 bg-emerald-50/40 rounded-xl border border-emerald-100/50">✓ Zero overdue instances audited.</p>
            ) : (
              overdue.map((item, idx) => (
                <ReportCard
                  key={idx}
                  title={item.book?.title || "Unknown Book"}
                  subtitle={`Patron: ${item.student?.name || "Unknown Student"}`}
                  details={`Fine: ₹${item.fineAmount}`}
                  isOverdue={true}
                />
              ))
            )}
          </Section>

          {/* CURRENTLY BORROWED BOOKS */}
          <Section title="Active Loans Out" icon={<Bookmark size={18} />}>
            {issued.length === 0 ? (
              <p className="text-xs font-semibold text-slate-400 text-center py-6">No current active distributions.</p>
            ) : (
              issued.map((item, idx) => (
                <ReportCard
                  key={idx}
                  title={item.book?.title || "Unknown Book"}
                  subtitle={`Patron: ${item.student?.name || "Unknown Student"}`}
                  details={`Out: ${item.borrowDate ? new Date(item.borrowDate).toLocaleDateString() : "N/A"}`}
                />
              ))
            )}
          </Section>

          {/* RETURNED BOOKS */}
          <Section title="Archived Collection Returns" icon={<CheckCircle2 size={18} />}>
            {returned.length === 0 ? (
              <p className="text-xs font-semibold text-slate-400 text-center py-6">No recorded transaction returns.</p>
            ) : (
              returned.map((item, idx) => (
                <ReportCard
                  key={idx}
                  title={item.book?.title || "Unknown Book"}
                  subtitle={`Patron: ${item.student?.name || "Unknown Student"}`}
                  details={`In: ${item.returnDate ? new Date(item.returnDate).toLocaleDateString() : "N/A"}`}
                />
              ))
            )}
          </Section>

        </div>
      </main>

      {/* STYLES & FRAME TIMINGS */}
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