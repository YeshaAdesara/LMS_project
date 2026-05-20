"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { 
  LibraryBig, 
  ArrowLeft, 
  UserPlus, 
  User, 
  Mail, 
  UserCheck, 
  Lock 
} from "lucide-react";

export default function AddUser() {
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/students", newUser);
      alert("✅ New user added successfully!");
      router.push("/admin_dashboard/users");
    } catch (error) {
      alert("❌ Failed to add user.");
      console.error(error);
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
                Admin Workspace
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                Identity Manager
              </h1>
            </div>
          </div>

          {/* BACK TO USERS MANAGEMENT */}
          <button
            type="button"
            onClick={() => router.push("/admin_dashboard/users")}
            className="h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            <span>Back to Users</span>
          </button>

        </div>
      </header>

      {/* 📘 MAIN CONTAINER AREA */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-full max-w-xl bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          
          <div className="p-8 sm:p-10">
            
            {/* VIEW HEADER */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center mb-4">
                <UserPlus size={26} className="text-white" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Provision New User Account
              </h2>
              <p className="text-slate-500 mt-1 text-sm font-medium">
                Register a secure credential record set for student or administrative personnel
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* FULL NAME */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    value={newUser.name}
                    onChange={handleChange}
                    placeholder="e.g., Alex Johnson"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={newUser.email}
                    onChange={handleChange}
                    placeholder="e.g., alex.j@university.edu"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              {/* SYSTEM ROLE SELECT */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Privilege Role Assignment</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserCheck size={18} className="text-slate-400" />
                  </div>
                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer font-medium text-sm"
                    required
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Account Access Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full h-14 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98]"
                >
                  <UserPlus size={18} />
                  <span>Provision Identity</span>
                </button>
              </div>

            </form>
          </div>

          {/* BOTTOM ACCENT BAR */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-blue-500" />
        </div>
      </main>

      {/* CORE FRAMING STYLES */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}