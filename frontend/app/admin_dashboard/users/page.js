"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  ArrowLeft, 
  Search, 
  UserPlus, 
  User, 
  Mail, 
  UserCheck, 
  Edit3, 
  Trash2 
} from "lucide-react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users"); // ✅ Changed to /api/users
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`); // ✅ Changed to /api/users
      alert("✅ User deleted successfully");
      fetchUsers(); // refresh list
    } catch (err) {
      alert("❌ Failed to delete user");
      console.error(err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

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
                Admin Workspace
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                User Management
              </h1>
            </div>
          </div>

          {/* BACK TO DASHBOARD */}
          <button
            type="button"
            onClick={() => router.push("/admin_dashboard")}
            className="h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>

        </div>
      </header>

      {/* 📘 MAIN WORKSPACE CONTAINER */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* VIEW HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            System Accounts Registry
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Review provisioned roles, manage active status, or terminate system workspace access.
          </p>
        </div>

        {/* CONTROLS BAR: SEARCH AND ADD USER BUTTON */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:max-w-md shadow-sm rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 text-sm font-medium"
            />
          </div>
          <button
            onClick={() => router.push("/admin_dashboard/users/add")}
            className="w-full sm:w-auto h-12 px-5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-slate-900 text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98]"
          >
            <UserPlus size={16} />
            <span>Add New User</span>
          </button>
        </div>

        {/* DYNAMIC LIST PIPELINE ENTRY */}
        {loading ? (
          <div className="text-center py-20">
            <div className="h-10 w-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-bold text-slate-500 animate-pulse">Syncing user directory logs...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[24px] border border-dashed border-slate-200 shadow-sm">
            <User className="mx-auto text-slate-300 mb-4" size={40} />
            <h3 className="text-base font-bold text-slate-800">No identities matched</h3>
            <p className="text-sm text-slate-400 mt-0.5">Try widening your search metrics or provision a new user entry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredUsers.map((user) => (
              <div 
                key={user._id} 
                className="bg-white border border-slate-200 rounded-[22px] p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 animate-[slideUp_0.4s_ease-out]"
              >
                <div>
                  {/* USER META CARD */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight line-clamp-1">
                        {user.name}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
                        <Mail size={13} className="text-slate-400" />
                        <span className="truncate max-w-[200px]">{user.email}</span>
                      </div>
                    </div>
                    
                    {/* PRIVILEGE ROLE SHIELD TAG */}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border shrink-0 ${
                      user.role?.toLowerCase() === "admin"
                        ? "bg-indigo-50 border-indigo-100 text-indigo-700"
                        : "bg-slate-50 border-slate-200/80 text-slate-600"
                    }`}>
                      <UserCheck size={11} />
                      <span className="capitalize">{user.role}</span>
                    </span>
                  </div>
                </div>

                <hr className="border-slate-100 my-1" />

                {/* CARD ACTIONS */}
                <div className="flex justify-between items-center mt-3 pt-1">
                  <Link
                    href={`/admin_dashboard/users/update/${user._id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                  >
                    <Edit3 size={13} />
                    <span>Edit Profile</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 hover:underline transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>Delete User</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>

      {/* PIPELINE FRAME TRANSITIONS */}
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