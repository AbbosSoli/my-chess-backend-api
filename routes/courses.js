const express = require('express')
const router = express.Router()
let courses = require('../data/courses.json')

router.get('/', (req, res) => {
	res.json(courses)
})

router.get('/:id', (req, res) => {
	const course = courses.find(c => c.id === req.params.id)
	if (course) {
		res.json(course)
	} else {
		res.status(404).send('Course not found')
	}
})

router.post('/', (req, res) => {
	const newCourse = req.body
	if (!newCourse.id || !newCourse.name || !newCourse.description) {
		return res.status(400).send('Invalid course data')
	}

	courses.push(newCourse)
	res.status(201).json(newCourse)
})

router.put('/:id', (req, res) => {
	const { id } = req.params
	const updatedCourse = req.body
	const courseIndex = courses.findIndex(c => c.id === id)

	if (courseIndex === -1) {
		return res.status(404).send('Course not found')
	}

	if (!updatedCourse.name || !updatedCourse.description) {
		return res.status(400).send('Invalid course data')
	}

	courses[courseIndex] = { id, ...updatedCourse }
	res.json(courses[courseIndex])
})

router.delete('/:id', (req, res) => {
	const { id } = req.params
	const courseIndex = courses.findIndex(c => c.id === id)

	if (courseIndex === -1) {
		return res.status(404).send('Course not found')
	}

	const deletedCourse = courses.splice(courseIndex, 1)
	res.json(deletedCourse)
})

module.exports = router
