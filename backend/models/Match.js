const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "singles" or "doubles"
  location: { type: String, required: true },
  dateTime: { type: Date, required: true },
  skillLevel: { type: String, required: true },
  players: [{ userId: mongoose.Schema.Types.ObjectId, checkedIn: Boolean }],
});

module.exports = mongoose.model('Match', MatchSchema);
