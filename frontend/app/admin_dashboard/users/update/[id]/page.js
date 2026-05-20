// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function UpdateUser({ params }) {
//   const { id } = params;
//   const router = useRouter();
//   const [user, setUser] = useState({ name: "", email: "", role: "" });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/students/${id}`);
//         setUser({
//           name: res.data.name,
//           email: res.data.email,
//           role: res.data.role,
//         });
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch user", err);
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/students/${id}`, user);
//       alert("✅ User updated successfully!");
//       router.push("/admin_dashboard/users");
//     } catch (err) {
//       alert("❌ Failed to update user.");
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   if (loading) return <p className="text-center mt-10">Loading user data...</p>;

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-center">✏️ Edit User</h2>
//       <form onSubmit={handleUpdate} className="space-y-4">
//         <div>
//           <label className="block font-medium">Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Role:</label>
//           <select
//             name="role"
//             value={user.role}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           >
//             <option value="">Select role</option>
//             <option value="admin">Admin</option>
//             <option value="student">Student</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           💾 Update User
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UpdateUser({ params }) {
  const { id } = params;
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/${id}`);
        setUser({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, user);
      alert("✅ User updated successfully!");
      router.push("/admin_dashboard/users");
    } catch (err) {
      alert("❌ Failed to update user.");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center mt-10">Loading user data...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#73E6CB] rounded-2xl shadow-lg mt-10 border border-[#00674F]">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0A3630]">✏️ Edit User</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium text-[#0A3630]">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#00674F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3EBB9E]"
          />
        </div>

        <div>
          <label className="block font-medium text-[#0A3630]">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#00674F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3EBB9E]"
          />
        </div>

        <div>
          <label className="block font-medium text-[#0A3630]">Role:</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
            className="w-full p-3 border border-[#00674F] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#3EBB9E]"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#00674F] hover:bg-[#0A3630] text-white px-5 py-3 rounded-md transition duration-300 w-full"
        >
          💾 Update User
        </button>
      </form>
    </div>
  );
}
