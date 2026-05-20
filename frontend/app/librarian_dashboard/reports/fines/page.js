"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  ArrowLeft, 
  Coins, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";

export default function FineCollected() {
  const [fine, setFine] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchFineCollected = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports/fines");
      setFine(res.data.totalFine);
    } catch (err) {
      console.error("Failed to fetch fine collected:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFineCollected();
  }, []);

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
                Financial Audit
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                Revenue Metrics
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

      {/* 📘 MAIN WORKSPACE AREA */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-full max-w-xl bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          
          <div className="p-8 sm:p-10 text-center flex flex-col items-center">
            
            {/* VIEW HERO ICON */}
            <div className="h-16 w-16 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg shadow-slate-900/10 flex items-center justify-center mb-6">
              <Coins size={30} className="text-white animate-[bounce_3s_infinite_ease-in-out]" />
            </div>

            <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-2">
              Total Fines Audited
            </h2>
            <p className="text-slate-500 text-sm font-medium mb-8 max-w-xs">
              Aggregate monitoring data sheet reflecting accumulated penalty resource collections
            </p>

            {loading ? (
              /* LOADING STATE */
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="h-10 w-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-3" />
                <p className="text-xs font-bold text-slate-400 animate-pulse uppercase tracking-wider">Syncing Ledger Balance...</p>
              </div>
            ) : (
              /* BALANCE DISPLAY GRID */
              <div className="w-full space-y-6 animate-[scaleUp_0.4s_ease-out]">
                <div className="bg-slate-50 border border-slate-200/70 rounded-3xl p-8 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none text-slate-900">
                    <Coins size={120} />
                  </div>
                  
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-600 mb-2">
                    Settled System Balances
                  </p>
                  <h3 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight font-sans">
                    ₹{fine?.toFixed(2) ?? "0.00"}
                  </h3>
                </div>

                {/* COMPLIANCE FOOTNOTE TAGS */}
                <div className="flex items-center justify-center gap-6 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100 w-full">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>Audited Logs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-indigo-500" />
                    <span>Verified Real-time</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* BOTTOM ACCENT BAR */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-blue-500" />
        </div>
      </main>

      {/* CORE CANVAS TIMINGS AND FRAME STRUCTURES */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}