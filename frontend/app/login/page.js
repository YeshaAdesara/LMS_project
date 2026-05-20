// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const { token, user } = res.data;
//       localStorage.setItem("token", token);

//       // 🔁 Redirect based on role
//       switch (user.role) {
//         case "admin":
//           window.location.href = "/admin_dashboard";
//           break;
//         case "student":
//           window.location.href = "/dashboard";
//           break;
//         case "librarian":
//           window.location.href = "/librarian_dashboard";
//           break;
//         case "patron":
//           window.location.href = "/patron_dashboard";
//           break;
//         default:
//           alert("Invalid role. Contact admin.");
//           break;
//       }
//     } catch (err) {
//       alert("❌ Login failed. Check credentials.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4 text-center">🔐 Login</h1>
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full mb-4 p-2 border rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <div className="relative mb-4">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full p-2 border rounded pr-10"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import axios from "axios";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  LogIn, 
  AlertCircle,
  LibraryBig
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);

      switch (user.role) {
        case "admin":
          window.location.href = "/admin_dashboard";
          break;
        case "student":
          window.location.href = "/dashboard";
          break;
        case "librarian":
          window.location.href = "/librarian_dashboard";
          break;
        case "patron":
          window.location.href = "/patron_dashboard";
          break;
        default:
          setError("Invalid role assigned. Please contact the administrator.");
          break;
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-100/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-[100px] pointer-events-none" />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-[slideUp_0.6s_ease-out]">
        
        <div className="p-8 sm:p-10">
          
          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center mb-5">
              <LibraryBig size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Enter your credentials to access the portal
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* EMAIL INPUT */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@library.edu"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ERROR BANNER */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
                <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-red-700 leading-tight pt-0.5">
                  {error}
                </p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
        
        {/* BOTTOM ACCENT BAR */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-blue-500" />
      </div>

      {/* CUSTOM KEYFRAMES */}
      <style jsx>{`
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  );
}