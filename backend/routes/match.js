const express = require('express');
const matchController = require('../controllers/matchController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const router = express.Router();

// Create a match (protected route)
router.post('/', authMiddleware, matchController.createMatch);

// Get all matches (public route)
router.get('/', matchController.getMatches);

// Check in to a match (protected route)
router.put('/:matchId/check-in', authMiddleware, matchController.checkIn);

module.exports = router;
