const express = require('express');
const router = express.Router();
const users = require('../data/users.json'); // Assuming you're using mock data

router.get('/', (req, res) => {
  res.json(users); // Send users data
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;
