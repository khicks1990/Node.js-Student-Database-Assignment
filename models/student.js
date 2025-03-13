const db = require("../db");

const Student = db.model("Student", {
  name: { type: String, required: true },
  gpa: { type: Number, min: 0, max: 4 },
  birthDate: { type: Date, default: Date.now },
  interests: [String],
  // Add your new fields below here
  major: { type: String, required: true },
  enrollmentStatus: { type: Boolean, default: false },
  year: { type: Number, min: 1, max: 5 },
  courses: [String]
});

module.exports = Student;