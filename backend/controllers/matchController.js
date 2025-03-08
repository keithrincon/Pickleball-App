const Match = require('../models/Match');

// Create a new match
exports.createMatch = async (req, res) => {
  const { type, location, dateTime, skillLevel } = req.body;
  try {
    const match = new Match({
      type,
      location,
      dateTime,
      skillLevel,
      players: [],
    });
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all matches
exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate(
      'players.userId',
      'name skillLevel'
    ); // Populate player details
    res.json(matches);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Check in to a match
exports.checkIn = async (req, res) => {
  const { matchId } = req.params;
  const { userId } = req.body;
  try {
    const match = await Match.findById(matchId);
    if (!match) throw new Error('Match not found');

    // Check if the user is already in the match
    const playerExists = match.players.some(
      (player) => player.userId.toString() === userId
    );
    if (playerExists) throw new Error('User already checked in');

    // Add the user to the match
    match.players.push({ userId, checkedIn: true });
    await match.save();
    res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
