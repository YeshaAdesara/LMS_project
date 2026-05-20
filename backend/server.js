
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// // Routes
// const authRoutes = require("./routes/authRoutes");
// const bookRoutes = require("./routes/bookRoutes");
// const studentRoutes = require("./routes/studentRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");
// const settingRoutes = require("./routes/settingRoutes");
// const reportRoutes = require("./routes/reportRoutes");
// const librarianRoutes = require("./routes/librarianRoutes"); // ✅ Already added
// const userRoutes = require("./routes/userRoutes"); // ✅ NEW ADDITION

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Route usage
// app.use("/api/auth", authRoutes);
// app.use("/api/books", bookRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/settings", settingRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/librarian", librarianRoutes);
// app.use("/api/users", userRoutes); // ✅ NEW ADDITION

// // Root test route
// app.get("/", (req, res) => {
//   res.send("Library Management System Backend is running!");
// });

// // DB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ Connected to MongoDB"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// // Routes
// const authRoutes = require("./routes/authRoutes");
// const bookRoutes = require("./routes/bookRoutes");
// const studentRoutes = require("./routes/studentRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");
// const settingRoutes = require("./routes/settingRoutes");
// const reportRoutes = require("./routes/reportRoutes");
// const librarianRoutes = require("./routes/librarianRoutes");
// const userRoutes = require("./routes/userRoutes"); // ✅ NEW

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Route usage
// app.use("/api/auth", authRoutes);
// app.use("/api/books", bookRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/settings", settingRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/librarian", librarianRoutes);
// app.use("/api/users", userRoutes); // ✅ NEW

// // Root test route
// app.get("/", (req, res) => {
//   res.send("Library Management System Backend is running!");
// });

// // DB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const studentRoutes = require("./routes/studentRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const settingRoutes = require("./routes/settingRoutes");
const reportRoutes = require("./routes/reportRoutes");
const librarianRoutes = require("./routes/librarianRoutes");
const userRoutes = require("./routes/userRoutes"); // ✅ NEW

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route usage
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes); // ✅ NEW
app.use("/api/transactions", transactionRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/librarian", librarianRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Library Management System Backend is running!");
});

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
