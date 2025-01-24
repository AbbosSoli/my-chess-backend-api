const express = require('express')
const cors = require('cors') // Import cors
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors()) // Enable CORS for all origins (you can restrict it to specific origins)
app.use(express.json()) // Parse incoming JSON requests

// Routes
app.use('/api/courses', require('./routes/courses')) // Courses API route
app.use('/api/users', require('./routes/users')) // Users API route

// Root endpoint
app.get('/', (req, res) => {
	res.send('Welcome to the Chess Backend API!')
})

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
