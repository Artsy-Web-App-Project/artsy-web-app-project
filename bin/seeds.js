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
        location: "Amsterdam"
    },
    {
        image: "",
        title: "The Starry Night",
        description: "The Starry Night, oil on canvas by Vincent van Gogh, 1889; in the Museum of Modern Art, New York City. History Archive/REX/Shutterstock.com. The oil-on-canvas painting is dominated by a night sky roiling with chromatic blue swirls, a glowing yellow crescent moon, and stars rendered as radiating orbs.",
        year: 1889,
        location: "Amsterdam"
    },
    {
        image: "",
        title: "The Bedroom",
        description: "Van Gogh's Bedroom, or Bedroom in Arles, painting is of a room where one sleeps, and he wanted the painting to put the viewer's mind and imagination at rest. Upon entering the room, there is a bed to the right. Along the wall to the right is a chair, table with water on it, and a window overlooking the street.",
        year: 1888,
        location: "Amsterdam"
    },
    {
        image: "",
        title: "The Birth of Venus",
        description: "Known as the “Birth of Venus”, the composition actually shows the goddess of love and beauty arriving on land, on the island of Cyprus, born of the sea spray and blown there by the winds, Zephyr and, perhaps, Aura. The goddess is standing on a giant scallop shell, as pure and as perfect as a pearl.",
        year: 1486,
        location: "Florence"
    },
    {
        image: "",
        title: "Calumny of Apelles",
        description: "The Calumny of Apelles is a panel painting in tempera by the Italian Renaissance painter Sandro Botticelli. Based on the description of an lost ancient painting by Apelles.",
        year: 1495,
        location: "Florence"
    },
    {
        image: "",
        title: "The Women of Algiers",
        description: "Les Femmes d'Alger (English: Women of Algiers) is a series of 15 paintings and numerous drawings by the Spanish artist Pablo Picasso. The series, created in 1954–1955, was inspired by Eugène Delacroix's 1834 painting The Women of Algiers in their Apartment",
        year: 1955,
        location: "Paris"
    },
    {
        image: "",
        title: "San Giorgio Maggiore at Dusk",
        description: "San Giorgio Maggiore al Crepuscolo is approximately two-by-three feet and painted in oil on canvas. It depicts mysterious buildings that seem to magically appear from the surrounding landscape, they almost seem to float in the background. The forms are gently inserted, though not enough to disguise their identity.",
        year: 1912,
        location: "Cardiff"
    },
    {
        image: "",
        title: "Cestello Annunciation",
        description: "The Cestello Annunciation, is a painting in tempera on panel made in 1489 by Sandro Botticelli. It was painted for the patron Benedetto di Ser Giovanni Guardi to adorn the church of the Florentine monastery of Cestello, which is now known as Santa Maria Maddalena de'Pazzi. The Annunciation. Artist. Sandro Botticelli.",
        year: 1489,
        location: "Florence"
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


        const artsPromise = Art.create(arts);
        const artistsPromise = Artist.create(artists);

        return Promise.all([artsPromise, artistsPromise])


    })
    .then(result => {

        const artsCreated = result[0];
        const artistsCreated = result[1];
        console.log(`Number of arts created... ${artsCreated.length} `);
        console.log(`Number of artists created... ${artistsCreated.length} `);


        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(`An error occurred while creating arts from the DB: ${err}`)
    });
