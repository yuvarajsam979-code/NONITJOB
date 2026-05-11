const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET all jobs (with optional distance filtering)
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query; // radius in meters

    let query = {};
    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      };
    }

    const jobs = await Job.find(query).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new job
router.post('/', async (req, res) => {
  const job = new Job(req.body);
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
