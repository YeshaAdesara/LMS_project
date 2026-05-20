"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  LogOut, 
  BookPlus, 
  Users, 
  Settings, 
  BarChart3, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2,
  Hash
} from "lucide-react";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const router = useRouter();

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch books:", err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    try {
      setDeleteLoadingId(id);
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      alert("✅ Book deleted successfully");
      fetchBooks();
    } catch (err) {
      alert("❌ Failed to delete book");
      console.error(err);
    } finally {
      setDeleteLoadingId(null);
    }
  };

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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
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
                Admin Control Panel
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

      {/* 📘 MAIN WORKSPACE */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* MANAGEMENT LINK CARD TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          <Link href="/admin_dashboard/add" className="group p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4 shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.99]">
            <div className="h-11 w-11 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
              <BookPlus size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Add New Book</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Register catalog items</p>
            </div>
          </Link>

          <Link href="/admin_dashboard/users" className="group p-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md active:scale-[0.99]">
            <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Manage Users</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Configure access rules</p>
            </div>
          </Link>

          <Link href="/admin_dashboard/settings" className="group p-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md active:scale-[0.99]">
            <div className="h-11 w-11 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 flex items-center justify-center shrink-0">
              <Settings size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">System Settings</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Adjust circulation policies</p>
            </div>
          </Link>

          <Link href="/admin_dashboard/reports" className="group p-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md active:scale-[0.99]">
            <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">View Reports</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Audits &amp; metric trends</p>
            </div>
          </Link>

        </div>

        {/* SECTION BREAK HEADER */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Catalog Inventory Workspace</h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Dynamic operations dashboard map</p>
          </div>
          
          {/* 🔍 SEARCH FILTERS CONTAINER */}
          <div className="relative w-full md:max-w-xs shadow-sm rounded-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Filter by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 text-xs font-medium"
            />
          </div>
        </div>

        {/* 📚 BOOK TILES ASSETS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books
            .filter(
              (book) =>
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase())
            )
            .map((book) => {
              const isAvailable = book.status?.toLowerCase() === "available";
              const isCurrentDeleting = deleteLoadingId === book._id;

              return (
                <div
                  key={book._id}
                  className="group relative bg-white border border-slate-200/80 rounded-[20px] p-4 flex flex-col shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-300 animate-[slideUp_0.4s_ease-out]"
                >
                  {/* ASSET METADATA COVER IMAGE */}
                  <div className="relative w-full h-44 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 mb-4 shrink-0">
                    <img
                      src={book.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop"}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* STATUS TAG FLOATS */}
                    <div className="absolute top-2.5 right-2.5">
                      {isAvailable ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm backdrop-blur-md">
                          <CheckCircle2 size={11} /> Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 shadow-sm">
                          <XCircle size={11} /> {book.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* INFO CONTAINER BLOCK */}
                  <div className="flex flex-col flex-1 mb-4">
                    <h4 className="text-sm font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">
                      by <span className="text-slate-700 font-bold">{book.author}</span>
                    </p>
                    
                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 mt-2.5">
                      <Hash size={12} />
                      <span>ISBN: <strong className="text-slate-600">{book.isbn}</strong></span>
                    </div>
                  </div>

                  <hr className="border-slate-100 mb-3 mt-auto" />

                  {/* INTERACTION ACTION LINKS BAR */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/admin_dashboard/update/${book._id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors py-1"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </Link>
                    <button
                      disabled={isCurrentDeleting}
                      onClick={() => handleDelete(book._id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 transition-colors py-1 disabled:opacity-40"
                    >
                      {isCurrentDeleting ? (
                        <div className="h-3 w-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
        </div>

        {/* EMPTY COLLECTION FEEDBACK ASYNC */}
        {books.filter(
          (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 mt-4 animate-[fadeIn_0.4s_ease-out]">
            <LibraryBig className="mx-auto text-slate-300 mb-4" size={40} />
            <h3 className="text-sm font-bold text-slate-800">No catalogue parameters matched</h3>
            <p className="text-xs text-slate-400 mt-1">Try modifying tracking phrases or register a new asset entry properties sheet.</p>
          </div>
        )}

      </main>

      {/* COMPONENT ENTRY INTERACTION TRIMS */}
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