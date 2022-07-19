const router = require("express").Router();
const Art = require("../models/Art.model");
const Artist = require("../models/Artist.model");

/* GET home page */
router.get("/", (req, res, next) => {
  Promise.all([ Art.find().limit(4), Artist.find().limit(4)])
    .then(([artsFromDB,artistsArr]) => {
      const data = {
        artsArr: artsFromDB,
        artistsArr: artistsArr,
      };
      res.render("index", { user: req.session.user, data: data });
    })
    .catch((error) => {
      console.log("Error getting arts from DB", error);
      next(error);
    });
});

module.exports = router;

