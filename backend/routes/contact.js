const express = require('express');
const router = express.Router();

// POST a new contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  console.log(`Received message from ${name} (${email}): ${message}`);
  
  // In a real app, you would save this to the database or send an email
  res.status(201).json({ message: 'Message received successfully!' });
});

module.exports = router;
