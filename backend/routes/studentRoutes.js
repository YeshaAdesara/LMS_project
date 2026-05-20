// const express = require("express");
// const router = express.Router();
// const {
//   getAllStudents,
//   getStudentById,
//   updateStudent,
//   deleteStudent
// } = require("../controllers/studentController");

// // Get all students
// router.get("/", getAllStudents);

// // Get student by ID
// router.get("/:id", getStudentById);

// // Update student
// router.put("/:id", updateStudent);

// // Delete student (optional)
// router.delete("/:id", deleteStudent);

// module.exports = router;

//


// const express = require("express");
// const router = express.Router();
// const {
//   createStudent,       // ✅ Add this
//   getAllStudents,
//   getStudentById,
//   updateStudent,
//   deleteStudent
// } = require("../controllers/studentController");

// // ✅ Create a new student
// router.post("/", createStudent);

// // Get all students
// router.get("/", getAllStudents);

// // Get student by ID
// router.get("/:id", getStudentById);

// // Update student
// router.put("/:id", updateStudent);

// // Delete student
// router.delete("/:id", deleteStudent);

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

// Create a student
router.post("/", createStudent);

// Get all students
router.get("/", getAllStudents);

// Get student by ID
router.get("/:id", getStudentById);

// Update student
router.put("/:id", updateStudent);

// Delete student
router.delete("/:id", deleteStudent);

module.exports = router;
