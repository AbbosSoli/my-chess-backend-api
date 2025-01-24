const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Path to the db.json file
const dbPath = path.join(__dirname, 'db.json');

// Helper function to read and write the JSON data
const readDbFile = () => JSON.parse(fs.readFileSync(dbPath));
const writeDbFile = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Get all courses
app.get('/api/courses', (req, res) => {
  const data = readDbFile();
  res.json(data.courses);
});

// Add a new course
app.post('/api/courses', (req, res) => {
  const data = readDbFile();
  const newCourse = { id: Date.now().toString(), ...req.body };
  data.courses.push(newCourse);
  writeDbFile(data);
  res.status(201).json(newCourse);
});

// Update a course
app.put('/api/courses/:id', (req, res) => {
  const data = readDbFile();
  const { id } = req.params;
  const courseIndex = data.courses.findIndex((course) => course.id === id);

  if (courseIndex !== -1) {
    data.courses[courseIndex] = { ...data.courses[courseIndex], ...req.body };
    writeDbFile(data);
    res.json(data.courses[courseIndex]);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Delete a course
app.delete('/api/courses/:id', (req, res) => {
  const data = readDbFile();
  const { id } = req.params;
  const updatedCourses = data.courses.filter((course) => course.id !== id);

  if (updatedCourses.length !== data.courses.length) {
    data.courses = updatedCourses;
    writeDbFile(data);
    res.status(200).json({ message: 'Course deleted' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
