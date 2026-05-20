"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  LogOut, 
  BarChart3, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Coins, 
  Wrench, 
  BookUp, 
  BookDown, 
  BookPlus, 
  Users, 
  ChevronRight 
} from "lucide-react";

export default function LibrarianDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden flex flex-col">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-100/30 blur-[120px] pointer-events-none" />

      {/* 🔝 TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-100/40 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          
          {/* BRANDING LOGO */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-900 shadow-sm border border-slate-800">
              <LibraryBig size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-indigo-600 leading-none mb-1">
                Management Terminal
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                Librarian Workspace
              </h1>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>

        </div>
      </header>

      {/* 📘 MAIN WORKSPACE PANEL */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-6 py-10 space-y-12 animate-[fadeIn_0.5s_ease-out]">
        
        {/* 📊 REPORTS MODULE */}
        <section className="space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <BarChart3 size={20} className="text-indigo-600" />
              Intelligence &amp; Reports
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-1">Audit operational balances and active circulation statuses.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Link href="/librarian_dashboard/reports/currently_borrowed" className="group p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 active:scale-[0.99]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/50 flex items-center justify-center shrink-0">
                  <BookOpen size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">Currently Borrowed Books</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Active asset distributions out</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

            <Link href="/librarian_dashboard/reports/returned_books" className="group p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 active:scale-[0.99]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/50 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">Returned Books Ledger</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Settled collection entries archives</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

            <Link href="/librarian_dashboard/reports/overdue" className="group p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 active:scale-[0.99]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-red-50 text-red-600 border border-red-100/50 flex items-center justify-center shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">Overdue Transactions</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Breached deadlines exceptions</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

            <Link href="/librarian_dashboard/reports/fines" className="group p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 active:scale-[0.99]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-100/50 flex items-center justify-center shrink-0">
                  <Coins size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">Total Fine Collected</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Financial penalty metrics tracking</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

          </div>
        </section>

        {/* ⚙️ CIRCULATION ACTIONS MODULE */}
        <section className="space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Wrench size={20} className="text-indigo-600" />
              Inventory &amp; Desk Actions
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-1">Execute circulation check-ins, check-outs, and registry updates.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Link href="/librarian_dashboard/issue" className="group p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 active:scale-[0.99]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <BookUp size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">Issue Book Copy</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Create active circulation loans</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

            <Link href="/librarian_dashboard/return" className="group p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 active:scale-[0.99]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <BookDown size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">Process Book Return</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Check-in returned physical materials</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

            <Link href="/librarian_dashboard/books" className="group p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 active:scale-[0.99]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                  <LibraryBig size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">View All Books</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Browse real-time global catalog entries</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

            <Link href="/librarian_dashboard/books/add" className="group p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 active:scale-[0.99]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                  <BookPlus size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">Add New Book</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Register new physical components</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>

          </div>
        </section>

        {/* 👥 IDENTITY MANAGEMENT MODULE */}
        <section className="space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Users size={20} className="text-indigo-600" />
              Identity Configuration
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-1">Provision user directory memberships and cardholders profiles.</p>
          </div>

          <div className="max-w-md">
            <Link href="/librarian_dashboard/users" className="group p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 active:scale-[0.99]">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">View &amp; Add Users</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Manage student identities registry</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-1 shrink-0" />
            </Link>
          </div>
        </section>

      </main>

      {/* CORE TIMINGS AND VIEW CANVAS SECTIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}