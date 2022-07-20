const mongoose = require('mongoose');
const Art = require('../models/Art.model');
const Artist = require('../models/Artist.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/artsy-web-app-project';


const arts = [
    {
        image: "",
        title: "The Night Watch",
        description: "It is a group portrait of a militia company. These were groups of able-bodied men who, if the need arose, could be called upon to defend the city or put down riots. The painting depicts the company of Captain Frans Banning Cocq and his lieutenant, Willem van Ruytenburgh, surrounded by sixteen of their men.",
        year: 1642,
        address: "Fokke Simmonzstraat 50A, 1017TJ, Amsterdam, Netherlands",
        artist: "Rembrandt Harmenszoon van Rijn"
    }
];

const artists = [
    {
        name: "Vincent Willem van Gogh",
        nationality: "Dutch",
        birth: 1853,
        death: 1890,
        about: "Vincent Willem van Gogh was a Dutch Post-Impressionist painter who posthumously became one of the most famous and influential figures in Western art history. In a decade, he created about 2,100 artworks, including around 860 oil paintings, most of which date from the last two years of his life."
    },
    {
        name: "Rembrandt Harmenszoon van Rijn",
        nationality: "Dutch",
        birth: 1606,
        death: 1669,
        about: "Rembrandt Harmenszoon van Rijn, usually simply known as Rembrandt, was a Dutch Golden Age painter, printmaker and draughtsman. An innovative and prolific master in three media, he is generally considered one of the greatest visual artists in the history of art and the most important in Dutch art history."
    },
    {
        name: "Sandro Botticelli",
        nationality: "Italian",
        birth: 1445,
        death: 1510,
        about: "At the height of his fame, the Florentine painter and draughtsman Sandro Botticelli was one of the most esteemed artists in Italy. His graceful pictures of the Madonna and Child, his altarpieces and his life-size mythological paintings, such as 'Venus and Mars', were immensely popular in his lifetime."
    },
    {
        name: "Pablo Ruiz Picasso",
        nationality: "Spanish",
        birth: 1881,
        death: 1973,
        about: "Pablo Picasso was a Spanish painter, sculptor, printmaker, ceramicist and stage designer considered one of the greatest and most influential artists of the 20th century. Picasso is credited, along with Georges Braque, with the creation of Cubism."
    },
    {
        name: "Oscar-Claude Monet",
        nationality: "French",
        birth: 1840,
        death: 1926,
        about: "French painter who was the initiator, leader, and unswerving advocate of the Impressionist style."
    }
];


mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
        return Artist.create(artists)
    })
    .then((artistsCreated) => {
        console.log(`Number of artists created... ${artistsCreated.length} `);

        const promises = arts.map(art => {
            return Artist.findOne({ name: art.artist }).then((artist) => {
                console.log(artist)
                art.artist = artist._id
                return art
            })
                .then((artUpdated) => {
                
                    return Art.create(artUpdated);
                });
        });
        return Promise.all(promises);
    })
    .then(artsCreated => {
        console.log(`Number of arts created... ${artsCreated.length} `);

        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(`An error occurred while creating arts from the DB: ${err}`)
    });
