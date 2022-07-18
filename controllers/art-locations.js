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


// @desc   Create an art location
// @route    POST /api/v1/art-locations
// @access Public

exports.addArtLocation = async (req, res, next) => {
    try {
       const art = await Art.create(req.body);

       return res.status(200).json({
        success: true,
        data: art
       })
    } catch (error) {
        console.error(error);
        if(error.code === 11000) {
            return res.status(400).json({ error: 'This art piece already exists' });
        }
        res.status(500).json({ error: "Server error"});
    }
};