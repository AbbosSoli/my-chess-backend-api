const express = require('express')
const router = express.Router()
let courses = require('../data/courses.json')

// Get all courses
router.get('/', (req, res) => {
	res.json(courses)
})

// Get a course by ID
router.get('/:id', (req, res) => {
	const courseId = parseInt(req.params.id, 10) // Ensure id is a number
	const course = courses.find(c => c.id === courseId)
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

	const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1
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
	const courseId = parseInt(req.params.id, 10)
	const { courseName, description, lessons, duration } = req.body

	const courseIndex = courses.findIndex(c => c.id === courseId)
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

// Delete a course by ID
router.delete('/:id', (req, res) => {
	const courseId = parseInt(req.params.id, 10)
	const courseIndex = courses.findIndex(c => c.id === courseId)

	if (courseIndex === -1) {
		return res.status(404).send('Course not found')
	}

	const deletedCourse = courses.splice(courseIndex, 1)
	saveCoursesToFile() // Save changes
	res.json(deletedCourse)
})
module.exports = router
