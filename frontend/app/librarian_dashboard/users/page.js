"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  ArrowLeft, 
  Users, 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function LibrarianUsersPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "Student" });
  const [message, setMessage] = useState({ type: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err);
      setMessage({ type: "error", content: "❌ Failed to fetch users." });
    }
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setMessage({ type: "error", content: "❌ Please fill out all fields before submitting." });
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", newUser);
      setMessage({ type: "success", content: "✅ User added successfully." });
      setNewUser({ name: "", email: "", password: "", role: "Student" });
      fetchUsers();
    } catch (err) {
      console.error("Add user error:", err);
      setMessage({ type: "error", content: "❌ Failed to add user." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
                Librarian Workspace
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                Patron Management
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

      {/* 📘 MAIN WORKSPACE LAYOUT CONTAINER */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out] flex flex-col gap-10">
        
        {/* VIEW HEADER */}
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="text-indigo-600" size={32} />
            System Accounts Registry
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Register new readers, map credentials, and audit operational privilege memberships.
          </p>
        </div>

        {/* OPERATION FEEDBACK NOTIFICATION BANNER */}
        {message.content && (
          <div className={`p-4 rounded-xl border flex items-start gap-3 animate-[fadeIn_0.3s_ease-out] w-full ${
            message.type === "success" 
              ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
              : "bg-red-50 border-red-100 text-red-800"
          }`}>
            {message.type === "success" ? (
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            )}
            <p className="text-xs font-bold leading-tight pt-0.5">
              {message.content.replace(/[\u2705\u274C]\s*/, "")}
            </p>
          </div>
        )}

        {/* TWO COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ADD USER PIPELINE FORM */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[24px] shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="p-6">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
                <UserPlus size={16} className="text-indigo-600" />
                Add New Account
              </h3>

              <div className="space-y-4">
                {/* NAME INPUT */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User size={15} />
                    </div>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* EMAIL INPUT */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail size={15} />
                    </div>
                    <input
                      type="email"
                      placeholder="john@library.edu"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* PASSWORD INPUT */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Access Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock size={15} />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* ROLE INPUT */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Privilege Role Set</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <UserCheck size={15} />
                    </div>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer font-bold text-xs"
                    >
                      <option value="Student">Student</option>
                      <option value="Patron">Patron</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* TRIGGER SUBMIT ACTION BUTTON */}
                <div className="pt-2">
                  <button
                    disabled={isLoading}
                    onClick={handleAddUser}
                    className="w-full h-11 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <span>Provision Identity</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-blue-500" />
          </div>

          {/* RIGHT COLUMN: ALL USERS RECORD CARDS DIRECTORY */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden p-6 flex flex-col">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Users size={16} className="text-indigo-600" />
              All Users Directory
            </h3>

            {users.length === 0 ? (
              <div className="text-center py-20">
                <Users className="mx-auto text-slate-300 mb-3" size={36} />
                <p className="font-bold text-slate-800 text-sm">No accounts found</p>
                <p className="text-xs text-slate-400 mt-0.5">There are zero reader indexes synced to this branch node.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1 scrollbar">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="border border-slate-200 rounded-xl p-4 shadow-sm bg-slate-50/30 flex flex-col justify-between transition-all duration-200 hover:border-slate-300 hover:bg-white"
                  >
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 tracking-tight line-clamp-1">{user.name}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-1">
                        <Mail size={12} className="text-slate-400 shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 border border-slate-200/60 text-slate-600 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* CORE TIMING AND VIEW SECTIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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