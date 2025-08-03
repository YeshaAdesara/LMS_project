const User = require("../models/User");

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "student" }).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update student info
exports.updateStudent = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { _id: req.params.id, role: "student" },
      req.body,
      { new: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ message: "Student updated", student: updated });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Optional: Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ _id: req.params.id, role: "student" });
    if (!deleted) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
