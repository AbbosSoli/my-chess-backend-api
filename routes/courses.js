const express = require('express')
const router = express.Router()

// Get all courses
router.get('/', (req, res) => {
	// Send a response here, for example, an array of courses
	res.json({ message: 'Courses fetched successfully' })
})

// Add a new course
router.post('/', (req, res) => {
	// Handle course creation
	res.json({ message: 'Course added successfully' })
})

module.exports = router
