const Art = require("../models/Art.model")

// @desc    Get all art locations
// @route    GET /api/v1/art-locations
// @access Public

exports.getArtLocations = async (req, res, next) => {
    try {
        const artLocations = await Art.find();
        
        return res.status(200).json({
            success: true,
            count: artLocations.length,
            data: artLocations
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error"});
    }
};


