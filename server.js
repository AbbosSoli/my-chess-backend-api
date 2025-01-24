const express = require('express')
const cors = require('cors') // Import CORS
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors()) // Enable CORS for all origins (you can restrict it to specific origins if needed)
app.use(express.json()) // Parse incoming JSON requests

// Routes
const coursesRouter = require('./routes/courses') // Import courses routes
const usersRouter = require('./routes/users') // Import users routes

app.use('/api/courses', coursesRouter) // Courses API route
app.use('/api/users', usersRouter) // Users API route

// Root endpoint
app.get('/', (req, res) => {
	res.send('Welcome to the Chess Backend API!')
})

// Handle 404 errors (for undefined routes)
app.use((req, res) => {
	res.status(404).json({ message: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack) // Log the error stack trace (for debugging)
	res.status(500).json({ message: 'Something went wrong!' }) // Send a generic error message
})

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
