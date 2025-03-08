const express = require('express');
const matchController = require('../controllers/matchController');
const router = express.Router();

// Create a match
router.post('/', matchController.createMatch);

// Get all matches
router.get('/', matchController.getMatches);

// Check in to a match
router.put('/:matchId/check-in', matchController.checkIn);

module.exports = router;
