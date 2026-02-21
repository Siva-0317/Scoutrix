const User = require('../models/user.model');

// @desc    Toggle Save/Unsave an Athlete
// @route   POST /api/users/save/:athleteId
exports.toggleSavePlayer = async (req, res) => {
    try {
        const recruiterId = req.user._id; // From authMiddleware
        const athleteId = req.params.athleteId; // From the URL

        // 1. Fetch the recruiter and the target athlete
        const recruiter = await User.findById(recruiterId);
        const athlete = await User.findById(athleteId);

        // 2. Validate the athlete exists and is actually an athlete
        if (!athlete || athlete.role !== 'athlete') {
            return res.status(404).json({ message: 'Athlete not found' });
        }

        // 3. Check if the athlete is already in the recruiter's saved list
        const isSaved = recruiter.savedPlayers.includes(athleteId);

        if (isSaved) {
            // If already saved, remove them (Unsave)
            recruiter.savedPlayers = recruiter.savedPlayers.filter(
                (id) => id.toString() !== athleteId
            );
        } else {
            // If not saved, add them
            recruiter.savedPlayers.push(athleteId);
        }

        // 4. Save the updated recruiter document
        await recruiter.save();

        res.status(200).json({ 
            message: isSaved ? 'Player removed from saved list' : 'Player saved successfully',
            savedPlayers: recruiter.savedPlayers 
        });

    } catch (error) {
        console.error("Save Player Error:", error);
        res.status(500).json({ message: 'Server error saving player' });
    }
};

// @desc    Get a Recruiter's Saved Players Dashboard
// @route   GET /api/users/saved
exports.getSavedPlayers = async (req, res) => {
    try {
        // Find the recruiter and fully populate the saved players' details
        const recruiter = await User.findById(req.user._id).populate(
            'savedPlayers', 
            'name location sport playerRole subRole style bio trustScore' // Fields we want to show on the dashboard
        );

        res.status(200).json(recruiter.savedPlayers);
    } catch (error) {
        console.error("Fetch Saved Players Error:", error);
        res.status(500).json({ message: 'Server error fetching saved players' });
    }
};