const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

// Get all students
router.get("/", getAllStudents);

// Get student by ID
router.get("/:id", getStudentById);

// Update student
router.put("/:id", updateStudent);

// Delete student (optional)
router.delete("/:id", deleteStudent);

module.exports = router;
