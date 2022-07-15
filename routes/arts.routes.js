const Art = require("../model/Art.model");
const Artist = require("../model/Artist.model");
const User = require("../model/User.model");

const router = require("express").Router();

const checkIfLoggedIn = require("../middleware/checkIfLoggedIn");




router.get("/", (req, res, next) => {
    Art.find()
        .populate("artist")
        .then((artsFromDB) => {
            const data = {
                artsArr: artsFromDB,
            };
            res.render("arts/arts-list", data)
        })
        .catch((error) => {
            console.log("Error getting arts from DB", error);
            next(error);
        });
});

router.get("/create", (req, res, next) => {
    res.render("arts/art-create");
});

router.post("/create", (req, res, next) => {
    const artDetails = {
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        artist: req.body.artist,
        location: req.body.location
    };
    Art.create(artDetails)
        .then(() => {
            res.redirect("/arts");
        })
        .catch((error) => {
            console.log("Error adding art to DB", error);
            next(error);
        });
});

router.get("/:artId", (req, res, next) => {
    const artId = req.params.artId;

    Art.findById(artId)
        .populate("artist")
        .then((artDetails) => {
            res.render("arts/art-details", artDetails);
        })
        .catch((error) => {
            console.log("Error getting art from DB", error);
            next(error);
        });
});

router.get("/:artId/edit", (req, res, next) => {

});

router.post("/:artId/edit", (req, res, next) => {

});

router.get("/:artId/delete", (req, res, next) => {

});

module.exports = router;
