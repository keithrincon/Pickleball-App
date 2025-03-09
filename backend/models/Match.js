const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // "singles" or "doubles"
    location: { type: String, required: true },
    dateTime: { type: Date, required: true },
    players: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        checkedIn: { type: Boolean, default: false },
      },
    ],
    skillLevel: { type: Number, required: true }, // Ensure this is a number
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Match', MatchSchema);
