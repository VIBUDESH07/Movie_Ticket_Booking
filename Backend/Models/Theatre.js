const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  seatingCapacity: { type: Number, required: true },
  seatStructure: {
    standard: { type: Number, default: 0 },
    premium: { type: Number, default: 0 },
    vip: { type: Number, default: 0 }
  },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of admins linked to this theatre
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Theatre', theatreSchema);
