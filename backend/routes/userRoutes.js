// const express = require("express");
// const router = express.Router();
// const { getAllUsers, searchUsers, addUser } = require("../controllers/userController");

// // Get all users
// router.get("/", getAllUsers);

// // Search users by name or email
// router.get("/search", searchUsers);

// // Add new user
// router.post("/", addUser);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");

// // 📌 Get all users (admin access)
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find().sort({ name: 1 }); // sort alphabetically by name
//     res.json(users);
//   } catch (error) {
//     console.error("❌ Error fetching users:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });
// module.exports = router;
const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser, getUserById, updateUser } = require("../controllers/userController");

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;
