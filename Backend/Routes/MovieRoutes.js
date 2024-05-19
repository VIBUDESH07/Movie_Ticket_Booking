const express = require('express');
const { getMovies, addMovie } = require('../Controller/Moviecontroller');

const router = express.Router();

router.get('/', getMovies);      // Route to fetch all movies
router.post('/', addMovie);      // Route to add a new movie

module.exports = router;
