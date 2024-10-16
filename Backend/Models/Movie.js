const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  poster: { type: String }, 
  showtimes: [{ type: Date, required: true }],  
  theatres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true }],  // Multiple theatres showing this movie
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
