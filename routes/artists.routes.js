const isLoggedIn = require("../middleware/isLoggedIn");
const Artist = require("../models/Artist.model");

const router = require("express").Router();

router.get("/", isLoggedIn, (req, res, next) => {
  Artist.find()
    .then( artistsArr => {
      res.render("artists/artists-list", {user: req.session.user, artistsArr: artistsArr})
    })
    .catch( (error) => {
      console.log("Error getting authors from DB", error);
      next(error);
    })
});

module.exports = router;