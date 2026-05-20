
// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";

// export default function Register() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError(""); // clear error while typing
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", formData);

//       if (res.data.message === "User registered successfully") {
//         alert("✅ Registration successful! Please login.");
//         router.push("/login");
//       } else {
//         setError(res.data.message || "Something went wrong.");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError("❌ Registration failed. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold mb-4">Register</h2>

//         {error && <p className="text-red-600 mb-2">{error}</p>}

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           className="w-full mb-3 p-2 border rounded"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 border rounded"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <div className="relative mb-3">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             className="w-full p-2 border rounded pr-10"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
//           >
//             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//           </button>
//         </div>

//         <select
//           name="role"
//           className="w-full mb-4 p-2 border rounded"
//           value={formData.role}
//           onChange={handleChange}
//         >
//           <option value="student">Student</option>
//           <option value="admin">Admin</option>
//           <option value="librarian">Librarian</option>
//           <option value="patron">Patron</option>
//         </select>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  User,
  Mail, 
  Lock, 
  UserCheck, 
  AlertCircle,
  LibraryBig,
  Eye, 
  EyeOff 
} from "lucide-react";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);

      if (res.data.message === "User registered successfully") {
        alert("✅ Registration successful! Please login.");
        router.push("/login");
      } else {
        setError(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please check your data and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-100/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-[100px] pointer-events-none" />

      {/* REGISTER CARD */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-[24px] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-[slideUp_0.6s_ease-out]">
        
        <div className="p-8 sm:p-10">
          
          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-14 w-14 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center mb-5">
              <LibraryBig size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Create an account
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              Join the platform to manage or access resources
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* FULL NAME INPUT */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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
                  name="email"
                  placeholder="name@library.edu"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* ROLE SELECT */}
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-bold text-slate-700">
                Assign System Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserCheck size={18} className="text-slate-400" />
                </div>
                <select
                  id="role"
                  name="role"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer font-medium"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="librarian">Librarian</option>
                  <option value="patron">Patron</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
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
                  "Create Account"
                )}
              </button>
            </div>

            {/* REDIRECT TO LOGIN */}
            <p className="text-center text-sm text-slate-500 font-medium pt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors">
                Sign In
              </Link>
            </p>

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