const express = require('express')
const router = express.Router()
let courses = require('../data/courses.json')

// Get all courses
router.get('/', (req, res) => {
	res.json(courses)
})

// Get a course by ID
router.get('/:id', (req, res) => {
	const courseId = req.params.id // Treat the id as a string
	const course = courses.find(c => c.id === courseId) // Compare as strings
	if (course) {
		res.json(course)
	} else {
		res.status(404).send('Course not found')
	}
})

// Create a new course
router.post('/', (req, res) => {
	const { courseName, description, lessons, duration } = req.body

	if (!courseName || !description) {
		return res.status(400).send('Invalid course data')
	}

	const newId =
		courses.length > 0
			? (Math.max(...courses.map(c => parseInt(c.id, 10))) + 1).toString()
			: '1' // Ensure newId is a string
	const createdCourse = {
		id: newId,
		courseName,
		description,
		lessons,
		duration,
	}

	courses.push(createdCourse)
	res.status(201).json(createdCourse)
})

router.put('/:id', (req, res) => {
	const courseId = req.params.id // Treat the id as a string
	const { courseName, description, lessons, duration } = req.body

	const courseIndex = courses.findIndex(c => c.id === courseId) // Compare as strings
	if (courseIndex === -1) {
		return res.status(404).send('Course not found')
	}

	if (!courseName || !description) {
		return res.status(400).send('Invalid course data')
	}

	courses[courseIndex] = {
		id: courseId,
		courseName,
		description,
		lessons,
		duration,
	}
	res.json(courses[courseIndex])
})
const fs = require('fs')
const path = require('path')

const saveCoursesToFile = () => {
	const filePath = path.join(__dirname, '../data/courses.json')

	// Save the updated courses array back to the file
	fs.writeFileSync(filePath, JSON.stringify(courses, null, 2), 'utf-8')
}

// Delete a course by ID
router.delete('/:id', (req, res) => {
	const courseId = req.params.id // Treat the id as a string
	const courseIndex = courses.findIndex(c => c.id === courseId) // Compare as strings

	if (courseIndex === -1) {
		return res.status(404).send('Course not found')
	}

	const deletedCourse = courses.splice(courseIndex, 1) // Remove the course from the array
	saveCoursesToFile() // Save changes to the file

	res.json(deletedCourse) // Send the deleted course as a response
})

module.exports = router
