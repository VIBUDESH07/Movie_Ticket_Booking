const express = require('express');
const router = express.Router();
const Theatre = require('./theatreModel');

// Route to add a new theatre
router.post('/add-theatre', async (req, res) => {
  try {
    const { name, location, seatingCapacity, seatStructure, admins } = req.body;
    
    const newTheatre = new Theatre({
      name,
      location,
      seatingCapacity,
      seatStructure,
      admins
    });

    const savedTheatre = await newTheatre.save();
    res.status(201).json({ message: 'Theatre added successfully!', theatre: savedTheatre });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add theatre', details: error.message });
  }
});

module.exports = router;
