const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const coursesPath = path.join(__dirname, '../data/courses.json');

// Your route handlers...

module.exports = router; // Ensure you export the router here
