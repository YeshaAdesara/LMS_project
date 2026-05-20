"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { 
  LibraryBig, 
  ArrowLeft, 
  Sliders, 
  Calendar, 
  Coins, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Save 
} from "lucide-react";

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    loanPeriodDays: "",
    finePerDay: "",
    maxBorrowLimit: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/settings");
      setSettings(res.data);
    } catch (err) {
      console.error("Failed to fetch settings:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSaving(true);

    try {
      await axios.put("http://localhost:5000/api/settings", settings);
      setMessage("✅ Settings updated successfully");
    } catch (err) {
      setMessage("❌ Failed to update settings");
      console.error(err);
    } finally {
      setIsSaving(false);
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
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-990 bg-slate-900 shadow-sm border border-slate-800">
              <LibraryBig size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-indigo-600 leading-none mb-1">
                Admin Console
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                System Governance
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
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
        
        {loading ? (
          <div className="text-center">
            <div className="h-10 w-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-bold text-slate-500 animate-pulse">Reading core configurations...</p>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="p-8 sm:p-10">
              
              {/* VIEW HEADER */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center mb-4">
                  <Sliders size={26} className="text-white" />
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Global System Parameters
                </h2>
                <p className="text-slate-500 mt-1 text-sm font-medium">
                  Modify restriction limits, timeline thresholds, and fiscal penalties
                </p>
              </div>

              {/* ACTION PIPELINE FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* LOAN PERIOD */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                    <Calendar size={15} className="text-slate-400" />
                    Loan Period (Days)
                  </label>
                  <input
                    type="number"
                    name="loanPeriodDays"
                    value={settings.loanPeriodDays}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                    required
                    min={1}
                  />
                </div>

                {/* FINE PER DAY */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                    <Coins size={15} className="text-slate-400" />
                    Fine Per Day (₹)
                  </label>
                  <input
                    type="number"
                    name="finePerDay"
                    value={settings.finePerDay}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                    required
                    min={0}
                  />
                </div>

                {/* MAX BORROW LIMIT */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                    <ShieldAlert size={15} className="text-slate-400" />
                    Maximum Asset Borrow Limit
                  </label>
                  <input
                    type="number"
                    name="maxBorrowLimit"
                    value={settings.maxBorrowLimit}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                    required
                    min={1}
                  />
                </div>

                {/* STATUS RESPONSE FEEDBACK MESSAGE */}
                {message && (
                  <div className={`p-4 rounded-xl border flex items-start gap-3 animate-[fadeIn_0.3s_ease-out] ${
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

                {/* TRIGGER INTERACTION BUTTON */}
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
                        <span>Save Configuration</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
            
            {/* BOTTOM ACCENT BAR */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-blue-500" />
          </div>
        )}
      </main>

      {/* TRANSITIONS DECLARATIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}