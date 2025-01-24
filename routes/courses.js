// Add a new course
router.post('/', (req, res) => {
	const courses = require(coursesPath)
	const { courseName, description, lessons, duration } = req.body

	// Validate input (remove the id check)
	if (
		!courseName ||
		!description ||
		lessons === undefined ||
		duration === undefined
	) {
		return res.status(400).send('Invalid course data')
	}

	// Auto-generate id (if courses are not empty, take the next id, otherwise start with 1)
	const newId = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1

	// Add new course
	const newCourse = { id: newId, courseName, description, lessons, duration }
	courses.push(newCourse)
	saveCourses(courses)

	res.status(201).json(newCourse)
})
