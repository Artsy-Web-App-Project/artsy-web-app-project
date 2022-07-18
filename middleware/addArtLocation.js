const Art = require("../models/Art.model")

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