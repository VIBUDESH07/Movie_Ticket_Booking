import  { useState, useEffect } from 'react';

const AddMovie = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ name: '', poster: '', rating: '' });

  // Fetch movies from backend
  useEffect(() => {
    fetch('http://localhost:5000/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  // Add new movie to backend
  const addMovie = () => {
    if (newMovie.name && newMovie.poster && newMovie.rating) {
      fetch('http://localhost:5000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      })
        .then((response) => response.json())
        .then((data) => {
          setMovies((prevMovies) => [...prevMovies, data]); // Add the new movie to the list
          setNewMovie({ name: '', poster: '', rating: '' }); // Reset form
        })
        .catch((error) => console.error('Error adding movie:', error));
    } else {
      alert('Please fill out all fields!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Add a New Movie</h2>
      <div className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={newMovie.name}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded w-60"
        />
        <input
          type="text"
          name="poster"
          placeholder="Poster URL"
          value={newMovie.poster}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded w-60"
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating (e.g., 4.5)"
          value={newMovie.rating}
          onChange={handleInputChange}
          className="border p-2 mr-2 rounded w-20"
        />
        <button
          onClick={addMovie}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Movie
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-4">Movie List</h2>
      <div className="flex space-x-4 overflow-x-scroll">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border rounded-lg p-4 w-48 bg-white shadow-md hover:shadow-lg transition"
          >
            <img src={movie.poster} alt={movie.name} className="w-full h-64 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{movie.name}</h3>
            <p className="text-gray-500">Rating: {movie.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMovie;
