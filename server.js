// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000; // Default to 5000 if not defined

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
