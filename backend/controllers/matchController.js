const Match = require('../models/Match');

// Create a new match
exports.createMatch = async (req, res) => {
  const { type, location, dateTime, skillLevel } = req.body;
  const createdBy = req.user.id; // Authenticated user's ID from JWT

  // Validate required fields
  if (!type || !location || !dateTime || !skillLevel) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Ensure skillLevel is a number
  if (typeof skillLevel !== 'number') {
    return res.status(400).json({ message: 'skillLevel must be a number' });
  }

  try {
    const match = new Match({
      type,
      location,
      dateTime,
      skillLevel,
      createdBy,
      players: [],
    });
    await match.save();

    // Emit a 'newMatch' event to all connected clients
    if (req.io) {
      req.io.emit('newMatch', match);
    } else {
      console.warn('Socket.io instance is missing in req.io');
    }

    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all matches
exports.getMatches = async (req, res) => {
  const { skillLevel } = req.query; // Optional skill level filter

  try {
    const query = skillLevel ? { skillLevel: Number(skillLevel) } : {};
    const matches = await Match.find(query)
      .populate('players.userId', 'name skillLevel') // Populate player details
      .populate('createdBy', 'name email'); // Populate creator details
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Check in to a match
exports.checkIn = async (req, res) => {
  const { matchId } = req.params;
  const userId = req.user.id;

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    // Check if the user is already in the match
    const playerExists = match.players.some(
      (player) => player.userId.toString() === userId
    );
    if (playerExists) {
      return res.status(400).json({ message: 'User already checked in' });
    }

    // Add the user to the match
    match.players.push({ userId, checkedIn: true });
    await match.save();

    // Emit a 'matchUpdated' event to all connected clients
    if (req.io) {
      req.io.emit('matchUpdated', match);
    } else {
      console.warn('Socket.io instance is missing in req.io');
    }

    res.json(match);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
