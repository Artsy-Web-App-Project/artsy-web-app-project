const Art = require("../models/Art.model");
const Artist = require("../models/Artist.model");
const User = require("../models/User.model");

const fileUploader = require('../config/cloudinary.config');
const geocoder = require("../utils/geocoder");

const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");




router.get("/", isLoggedIn, (req, res, next) => {
    Art.find()
        .populate("artist")
        .then((artsFromDB) => {
            const data = {
                artsArr: artsFromDB,
            };
            res.render("arts/arts-list", {user: req.session.user, data: data})
        })
        .catch((error) => {
            console.log("Error getting arts from DB", error);
            next(error);
        });
});

router.get("/create", isLoggedIn, (req, res, next) => {
    Artist.find()
    .then(artistsArr => {
        res.render("arts/art-create", {user: req.session.user, artistsArr: artistsArr});
    })
    .catch((error) => {
        console.log("Error getting artists from DB", error);
        next(error);
    })
    
});

router.post("/create", fileUploader, (req, res, next) => {
    let totalAddress = `${req.body.address} ${req.body.postalcity} ${req.body.country}`;
    const artDetails = {
        image: req.file.path,
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        artist: req.body.artist,
        address: totalAddress
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

router.get("/:artId", isLoggedIn, (req, res, next) => {
    const artId = req.params.artId;

    Art.findById(artId)
        .populate("artist")
        .then((artDetails) => {
            res.render("arts/art-details", {user: req.session.user, artDetails: artDetails});
        })
        .catch((error) => {
            console.log("Error getting art from DB", error);
            next(error);
        });
});

router.get("/:artId/edit", isLoggedIn, (req, res, next) => {
    const {artId} = req.params;

    Promise.all([Art.findById(artId), Artist.find()])

        .then(([artDetails, artistsArr]) => {
            res.render("arts/art-edit", {user: req.session.user, artistsArr: artistsArr, artDetails: artDetails});
        })
        .catch((error) => {
            console.log("Error getting art details from DB", error);
            next(error);
        })
});

router.post("/:artId/edit", (req, res, next) => {
    // let totalAddress = `${req.body.address} ${req.body.postalcity} ${req.body.country}`;
    const { artId } = req.params;

    const artDetails = {
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        artist: req.body.artist,
        address: req.body.totalAddress
    };
    const loc = geocoder.geocode(artDetails.address)
        .then((loc) => {
            artDetails.location = {
                type: "Point",
                coordinates: [loc[0].longitude, loc[0].latitude],
                formattedAddress: loc[0].formattedAddress,
            };
            artDetails.address = undefined;
            return artDetails;
        })
        .then((artDetails) => {
            return Art.findByIdAndUpdate(artId, artDetails)
        })



        .then(() => {
            res.redirect(`/arts/${artId}`);
        })
        .catch((error) => {
            console.log("Error updating art in the DB", error);
            next(error);
        })
});

router.post("/:artId/delete", (req, res, next) => {
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
