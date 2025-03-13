const express = require("express");
const bodyParser = require("body-parser");
const Student = require("./models/student");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

app.post('/create', async (req, res) => {
   try {
     const studentData = {
       name: req.body.name,
       gpa: parseFloat(req.body.gpa),
       birthDate: new Date(req.body.birthdate),
       interests: req.body.interests ? req.body.interests.split(',').map(s => s.trim()) : [],
       major: req.body.major,
       enrollmentStatus: !!req.body.enrollmentStatus,
       year: parseInt(req.body.year, 10),
       courses: req.body.courses ? req.body.courses.split(',').map(s => s.trim()) : []
     };
 
     const student = new Student(studentData);
     await student.save();
     
     // Get all students from database
     const allStudents = await Student.find({}).lean();

     res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Student Created</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <div class="form-container">
      <h1>Student Created Successfully!</h1>
      <a href="/" style="display: inline-block; margin-bottom: 20px;">Create Another</a>

        <h2>All Students:</h2>
        <table class="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>GPA</th>
              <th>Birth Date</th>
              <th>Major</th>
              <th>Status</th>
              <th>Year</th>
              <th>Courses</th>
            </tr>
          </thead>
<tbody>
  ${allStudents.map(student => `
    <tr>
      <td>${student.name}</td>
      <td>${student.gpa}</td>
      <td>${new Date(student.birthDate).toLocaleDateString()}</td>
      <td>${student.major}</td>
      <td>${student.enrollmentStatus ? 'Enrolled' : 'Not Enrolled'}</td>
      <td>Year ${student.year}</td>
      <td>${(student.courses || []).join(', ')}</td>
    </tr>
  `).join('')}
</tbody>
        </table>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(400).send(`Error: ${error.message}`);
  }
});

app.listen(3000);