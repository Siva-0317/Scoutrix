const express = require('express');
const router = express.Router();
const { protect, authorizeRole } = require('../middleware/authMiddleware');
const { toggleSavePlayer, getSavedPlayers } = require('../controllers/user.controller');

// Only recruiters can save players
router.post('/users/save/:athleteId', protect, authorizeRole('recruiter'), toggleSavePlayer);

// Only recruiters can view their own saved dashboard
router.get('/users/saved', protect, authorizeRole('recruiter'), getSavedPlayers);

module.exports = router;