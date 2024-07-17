const Movie = require('../Models/Movie');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error });
  }
};
const addMovie = async (req, res) => {
  const { name, poster, rating } = req.body;

  if (!name || !poster || !rating) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMovie = new Movie({ name, poster, rating });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie', error });
  }
};

module.exports = { getMovies, addMovie };
