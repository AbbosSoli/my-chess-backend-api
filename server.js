const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/courses', require('./routes/courses'))
app.use('/api/users', require('./routes/users'))

app.get('/', (req, res) => {
	res.send('Welcome to the Chess Backend API!')
})

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
