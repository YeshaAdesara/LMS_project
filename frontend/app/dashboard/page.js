"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import { 
  LibraryBig, 
  BookOpen, 
  LogOut, 
  Search, 
  CheckCircle2, 
  XCircle, 
  BookmarkPlus 
} from "lucide-react";

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [borrowLoadingId, setBorrowLoadingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/"); // ✅ Redirect to Welcome page if not logged in
    } else {
      setToken(storedToken);
      axios
        .get("http://localhost:5000/api/books")
        .then((res) => setBooks(res.data))
        .catch((err) => console.error("Book fetch error:", err));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/"); // ✅ Redirect to Welcome page
  };

  const handleBorrow = async (bookId) => {
    try {
      setBorrowLoadingId(bookId);
      const decoded = jwt_decode(token);
      const studentId = decoded.id;

      const payload = { studentId, bookId };

      await axios.post("http://localhost:5000/api/transactions/borrow", payload);
      alert("✅ Book borrowed successfully!");

      const refreshed = await axios.get("http://localhost:5000/api/books");
      setBooks(refreshed.data);
    } catch (err) {
      console.error("Borrow error:", err.response?.data || err.message);
      alert("❌ Could not borrow this book.");
    } finally {
      setBorrowLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      
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
                Student Workspace
              </p>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                LMS Discovery Portal
              </h1>
            </div>
          </div>

          {/* ACTION BUTTON GROUP */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => router.push("/dashboard/mybooks")}
              className="group flex-1 sm:flex-initial h-11 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-indigo-600 text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.98]"
            >
              <BookOpen size={16} />
              <span>My Books</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="h-11 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* 📘 MAIN CONTENT WORKSPACE */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* VIEW HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Search &amp; Borrow Books
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Browse through our real-time academic catalog assets below.
          </p>
        </div>

        {/* 🔍 EXPLORATION / SEARCH BAR */}
        <div className="relative max-w-2xl mb-10 shadow-sm rounded-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search catalog by title, keyword, or author..."
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 text-sm font-medium shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 📚 INTUITIVE BOOK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books
            .filter(
              (book) =>
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase())
            )
            .map((book) => {
              const isAvailable = book.status === "available";
              const isCurrentLoading = borrowLoadingId === book._id;

              return (
                <div
                  key={book._id}
                  className="group relative bg-white border border-slate-200/80 rounded-[20px] p-4 flex flex-col shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-300 animate-[slideUp_0.5s_ease-out]"
                >
                  {/* ASSET METADATA COVER IMAGE */}
                  <div className="relative w-full h-48 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 mb-4 shrink-0">
                    <img
                      src={book.image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop"}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* FLOATING STATUS BADGES */}
                    <div className="absolute top-2.5 right-2.5">
                      {isAvailable ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm backdrop-blur-md">
                          <CheckCircle2 size={12} /> Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200 shadow-sm">
                          <XCircle size={12} /> Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* DESCRIPTION PACK */}
                  <div className="flex flex-col flex-1 mb-5">
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      by <span className="text-slate-700 font-bold">{book.author}</span>
                    </p>
                  </div>

                  {/* TRANSACTION TRIGGER ACTION */}
                  <button
                    disabled={!isAvailable || isCurrentLoading}
                    onClick={() => handleBorrow(book._id)}
                    className={`w-full h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                      isAvailable
                        ? "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/10 active:scale-[0.97]"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50"
                    }`}
                  >
                    {isCurrentLoading ? (
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <BookmarkPlus size={14} />
                        <span>{isAvailable ? "Borrow Asset" : "Unavailable"}</span>
                      </>
                    )}
                  </button>

                </div>
              );
            })}
        </div>

        {/* EMPTY STATE FALLBACK */}
        {books.filter(
          (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 mt-6 animate-[fadeIn_0.4s_ease-out]">
            <LibraryBig className="mx-auto text-slate-300 mb-4" size={40} />
            <h3 className="text-base font-bold text-slate-800">No catalogue matches found</h3>
            <p className="text-sm text-slate-400 mt-1">Try adapting your search terms or view alternative criteria.</p>
          </div>
        )}

      </main>

      {/* CORE KEYFRAME ANIMATIONS */}
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