const express = require('express');
const router = express.Router();
const courses = require('../data/courses.json'); // Mock data

router.get('/', (req, res) => {
  res.json(courses); // Send courses data
});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (course) {
    res.json(course);
  } else {
    res.status(404).send('Course not found');
  }
});

module.exports = router;
