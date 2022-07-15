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
    Artist.find()
    .then(artistsArr => {
        res.render("arts/art-create", {artistsArr});
    })
    .catch((error) => {
        console.log("Error getting artists from DB", error);
        next(error);
    })
    
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
    const {artId} = req.params;

    Art.findById(artId)
        .then((artDetails) => {
            res.render("arts/art-edit", artDetails);
        })
        .catch((error) => {
            console.log("Error getting art details from DB", error);
            next(error);
        })
});

router.post("/:artId/edit", (req, res, next) => {
    const {artId} = req.params;
    const {image, title, description, year, artist, location} = req.params;

    Art.findByIdAndUpdate(artId, {image, title, description, year, artist, location})
        .then (() => {
            res.redirect(`/arts/${artId}`);
        })
        .catch((error) => {
            console.log("Error updating art in the DB", error);
            next(error);
        })
});

router.get("/:artId/delete", (req, res, next) => {
    const {artId} = req.params;

    Art.findByIdAndRemove(artId)
        .then(() => {
            res.redirect("/arts");
        })
        .catch((error) => {
            console.log("Error deleting art from DB", error);
            next(error);
        })

});

module.exports = router;
