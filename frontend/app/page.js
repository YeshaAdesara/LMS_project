"use client";

import Link from "next/link";
import {
  ArrowRight,
  LibraryBig,
  ShieldCheck,
  BookOpen,
  BarChart3,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <ShieldCheck size={20} />,
      title: "Authentication",
      text: "Secure role-based access",
    },
    {
      icon: <BookOpen size={20} />,
      title: "Transactions",
      text: "Issue & return workflows",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Reports",
      text: "Analytics & fine tracking",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden relative selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      {/* SUBTLE BACKGROUND GRID */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* AMBIENT GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-50/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-[100px] pointer-events-none" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 lg:py-12">
        
        {/* TOP NAV */}
        <header className="flex items-center justify-between animate-[fadeIn_0.8s_ease-out]">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-slate-900 shadow-sm border border-slate-800">
              <LibraryBig size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 mb-0.5">
                System Portal
              </p>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                LMS Workspace
              </h2>
            </div>
          </div>

          {/* STATUS */}
          <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Systems Operational
            </span>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh] mt-12 lg:mt-0">
          
          {/* LEFT: COPY & CTAs */}
          <div className="animate-[slideUp_0.8s_ease-out]">
            
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50 mb-8">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100">
                <span className="text-[10px] font-bold text-indigo-600">v2</span>
              </span>
              <span className="text-sm font-medium text-indigo-700">
                Modern Full-Stack Library Platform
              </span>
            </div>

            {/* HEADING */}
            <h1 className="text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-tight font-extrabold text-slate-900">
              Manage your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                library assets
              </span>
              <br className="hidden md:block" />
              with precision.
            </h1>

            {/* TEXT */}
            <p className="text-lg leading-relaxed text-slate-600 mt-6 max-w-lg">
              A scalable role-based system built to streamline book
              inventory, borrowing operations, user management, and detailed reporting through a clean, enterprise-grade interface.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              
              {/* LOGIN */}
              <Link href="/login">
                <button className="group w-full sm:w-auto h-14 px-8 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-slate-900 text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98]">
                  Sign In to Dashboard
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </Link>

              {/* REGISTER */}
              <Link href="/register">
                <button className="w-full sm:w-auto h-14 px-8 rounded-xl text-sm font-semibold flex items-center justify-center border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]">
                  Request Access
                </button>
              </Link>
            </div>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-3 gap-4 mt-16 pt-8 border-t border-slate-100">
              {features.map((item, index) => (
                <div key={index} className="group">
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 transition-colors group-hover:bg-indigo-100">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-snug">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: DASHBOARD MOCKUP */}
          <div className="relative animate-[floatIn_1s_ease-out]">
            
            {/* FLOATING STAT CARD */}
            <div className="absolute -top-6 -right-6 hidden lg:flex flex-col z-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Active Borrowings
                </p>
              </div>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                1,248
              </h3>
            </div>

            {/* MAIN DASHBOARD CONTAINER */}
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-3 lg:p-4 shadow-2xl shadow-slate-200/50">
              
              {/* WINDOW */}
              <div className="bg-white rounded-[24px] overflow-hidden border border-slate-200 shadow-sm">
                
                {/* MAC-STYLE TOPBAR */}
                <div className="h-14 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between px-5">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-300" />
                    <div className="h-3 w-3 rounded-full bg-slate-300" />
                    <div className="h-3 w-3 rounded-full bg-slate-300" />
                  </div>
                  <div className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">
                    admin.lms-portal.dev
                  </div>
                  <div className="w-12" /> {/* Spacer for centering */}
                </div>

                {/* DASHBOARD CONTENT */}
                <div className="p-6 lg:p-8 space-y-6">
                  
                  {/* HERO METRIC */}
                  <div className="rounded-2xl bg-indigo-600 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none">
                      <LibraryBig size={120} />
                    </div>
                    <p className="text-indigo-200 text-sm font-medium mb-2">
                      System Overview
                    </p>
                    <h3 className="text-3xl font-bold leading-tight">
                      Centralized <br /> Library Operations
                    </h3>
                  </div>

                  {/* STAT GRIDS */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Registered Users
                      </p>
                      <h4 className="text-2xl font-black text-slate-900">
                        4 Roles
                      </h4>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Total Books
                      </p>
                      <h4 className="text-2xl font-black text-slate-900">
                        Inventory
                      </h4>
                    </div>
                  </div>

                  {/* LIST ITEMS */}
                  <div className="space-y-3">
                    <div className="rounded-xl border border-slate-100 p-4 flex items-center justify-between transition-colors hover:bg-slate-50 cursor-default">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <BookOpen size={18} className="text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            Active Transactions
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Borrowing Records
                          </p>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        Live
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 flex items-center justify-between transition-colors hover:bg-slate-50 cursor-default">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <BarChart3 size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            Fine & Analytics
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Reporting Module
                          </p>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                        Live
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </section>
      </div>

      {/* CUSTOM KEYFRAMES */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </main>
  );
}