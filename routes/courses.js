const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const coursesPath = path.join(__dirname, '../data/courses.json') // Path to courses.json

// Helper function to save courses to the file
const saveCourses = courses => {
	fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2))
}

// Read all courses
router.get('/', (req, res) => {
	const courses = require(coursesPath)
	res.json(courses)
})

// Get a specific course by ID
router.get('/:id', (req, res) => {
	const courses = require(coursesPath)
	const course = courses.find(c => c.id === req.params.id)
	if (course) {
		res.json(course)
	} else {
		res.status(404).send('Course not found')
	}
})

// Add a new course
router.post('/', (req, res) => {
	const courses = require(coursesPath)
	const { id, courseName, description, lessons, duration } = req.body

	// Validate input
	if (
		!id ||
		!courseName ||
		!description ||
		lessons === undefined ||
		duration === undefined
	) {
		return res.status(400).send('Invalid course data')
	}

	// Add new course
	const newCourse = { id, courseName, description, lessons, duration }
	courses.push(newCourse)
	saveCourses(courses)

	res.status(201).json(newCourse)
})

// Update an existing course
router.put('/:id', (req, res) => {
	const courses = require(coursesPath)
	const { id, courseName, description, lessons, duration } = req.body

	const courseIndex = courses.findIndex(c => c.id === req.params.id)
	if (courseIndex === -1) {
		return res.status(404).send('Course not found')
	}

	// Update the course
	const updatedCourse = {
		id: req.params.id,
		courseName,
		description,
		lessons,
		duration,
	}
	courses[courseIndex] = updatedCourse
	saveCourses(courses)

	res.json(updatedCourse)
})

// Delete a course
router.delete('/:id', (req, res) => {
	const courses = require(coursesPath)

	const courseIndex = courses.findIndex(c => c.id === req.params.id)
	if (courseIndex === -1) {
		return res.status(404).send('Course not found')
	}

	// Remove the course
	const deletedCourse = courses.splice(courseIndex, 1)
	saveCourses(courses)

	res.json(deletedCourse[0])
})

module.exports = router
