const mongoose = require("mongoose");
const Art = require("../models/Art.model");
const Artist = require("../models/Artist.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/artsy-web-app-project";

const arts = [
  {
    image:
      "https://res.cloudinary.com/creatives-around/image/upload/v1658321975/atrsy-web-app-project/sagohzb3o24wtlkomguh.jpg",
    title: "The Night Watch",
    description:
      "It is a group portrait of a militia company. These were groups of able-bodied men who, if the need arose, could be called upon to defend the city or put down riots. The painting depicts the company of Captain Frans Banning Cocq and his lieutenant, Willem van Ruytenburgh, surrounded by sixteen of their men.",
    year: 1642,
    address: "Museumstraat 1, 1071 XX Amsterdam, Netherlands",
    artist: "Rembrandt Harmenszoon van Rijn",
  },
  {
    image:
      "https://res.cloudinary.com/creatives-around/image/upload/v1658322256/atrsy-web-app-project/uaoidbplukvsy4x9afht.jpg",
    title: "The Starry Night",
    description:
      "The Starry Night, oil on canvas by Vincent van Gogh, 1889; in the Museum of Modern Art, New York City. History Archive/REX/Shutterstock.com. The oil-on-canvas painting is dominated by a night sky roiling with chromatic blue swirls, a glowing yellow crescent moon, and stars rendered as radiating orbs.",
    year: 1889,
    address: "Museumstraat 1, 1071 XX Amsterdam, Netherlands",
    artist: "Vincent Willem van Gogh",
  },
  {
    image:
      "https://res.cloudinary.com/creatives-around/image/upload/v1658322416/atrsy-web-app-project/dhkrmbgjzvfbkgum3nfm.jpg",
    title: "The Bedroom",
    description:
      "Van Gogh's Bedroom, or Bedroom in Arles, painting is of a room where one sleeps, and he wanted the painting to put the viewer's mind and imagination at rest. Upon entering the room, there is a bed to the right. Along the wall to the right is a chair, table with water on it, and a window overlooking the street.",
    year: 1888,
    address: "Museumstraat 1, 1071 XX Amsterdam, Netherlands",
    artist: "Vincent Willem van Gogh",
  },
  {
    image:
      "https://res.cloudinary.com/creatives-around/image/upload/v1658322494/atrsy-web-app-project/ln1ytu23cl2hehgfpinl.jpg",
    title: "The Birth of Venus",
    description:
      "Known as the “Birth of Venus”, the composition actually shows the goddess of love and beauty arriving on land, on the island of Cyprus, born of the sea spray and blown there by the winds, Zephyr and, perhaps, Aura. The goddess is standing on a giant scallop shell, as pure and as perfect as a pearl.",
    year: 1486,
    address: "Piazzale degli Uffizi, 6, 50122 Firenze FI, Italy",
    artist: "Sandro Botticelli",
  },
  {
    image:
      "https://res.cloudinary.com/creatives-around/image/upload/v1658322546/atrsy-web-app-project/ri7iqisl6bs04m9zleos.jpg",
    title: "Calumny of Apelles",
    description:
      "The Calumny of Apelles is a panel painting in tempera by the Italian Renaissance painter Sandro Botticelli. Based on the description of an lost ancient painting by Apelles.",
    year: 1495,
    address: "Piazzale degli Uffizi, 6, 50122 Firenze FI, Italy",
    artist: "Sandro Botticelli",
  },
  {
    image:
      "https://res.cloudinary.com/creatives-around/image/upload/v1658322713/atrsy-web-app-project/qdjbilirbcvvcxut1vok.jpg",
    title: "The Women of Algiers",
    description:
      "Les Femmes d'Alger (English: Women of Algiers) is a series of 15 paintings and numerous drawings by the Spanish artist Pablo Picasso. The series, created in 1954–1955, was inspired by Eugène Delacroix's 1834 painting The Women of Algiers in their Apartment",
    year: 1955,
    address: "Rue de Rivoli, 75001 Paris, France",
    artist: "Pablo Ruiz Picasso",
  },
  {
    image:
      "https://res.cloudinary.com/creatives-around/image/upload/v1658322754/atrsy-web-app-project/ajv0qswvebfkuk7wzlnf.jpg",
    title: "San Giorgio Maggiore at Dusk",
    description:
      "San Giorgio Maggiore al Crepuscolo is approximately two-by-three feet and painted in oil on canvas. It depicts mysterious buildings that seem to magically appear from the surrounding landscape, they almost seem to float in the background. The forms are gently inserted, though not enough to disguise their identity.",
    year: 1912,
    address: "Cardiff CF10 3NP, United Kingdom",
    artist: "Oscar-Claude Monet",
  },
  {
    image:
      "https://res.cloudinary.com/creatives-around/image/upload/v1658322813/atrsy-web-app-project/hz5rnr2dwdiyljqb1ttf.jpg",
    title: "Cestello Annunciation",
    description:
      "The Cestello Annunciation, is a painting in tempera on panel made in 1489 by Sandro Botticelli. It was painted for the patron Benedetto di Ser Giovanni Guardi to adorn the church of the Florentine monastery of Cestello, which is now known as Santa Maria Maddalena de'Pazzi. The Annunciation. Artist. Sandro Botticelli.",
    year: 1489,
    address: "Piazzale degli Uffizi, 6, 50122 Firenze FI, Italy",
    artist: "Sandro Botticelli",
  },
  {
    image:
      "https://res.cloudinary.com/creatives-around/image/upload/v1658325509/atrsy-web-app-project/hebhgimf4gqvygcrtcml.jpg",
    title: "Wheatfield with Crows",
    description:
      "Wheatfield with Crows is a July 1890 painting by Vincent van Gogh. It has been cited by several critics as one of his greatest works. It is commonly stated that this was van Gogh's final painting. However, art historians are uncertain as to which painting was van Gogh's last, as no clear historical records exist.",
    year: 1890,
    address: "Museumstraat 1, 1071 XX Amsterdam, Netherlands",
    artist: "Vincent Willem van Gogh",
  },
];

const artists = [
  {
    name: "Vincent Willem van Gogh",
    nationality: "Dutch",
    birth: 1853,
    death: 1890,
    about:
      "Vincent Willem van Gogh was a Dutch Post-Impressionist painter who posthumously became one of the most famous and influential figures in Western art history. In a decade, he created about 2,100 artworks, including around 860 oil paintings, most of which date from the last two years of his life.",
    image: "https://res.cloudinary.com/creatives-around/image/upload/v1658340283/atrsy-web-app-project/ooreqowplfcjeay4oxnt.jpg" 
  },
  {
    name: "Rembrandt Harmenszoon van Rijn",
    nationality: "Dutch",
    birth: 1606,
    death: 1669,
    about:
      "Rembrandt Harmenszoon van Rijn, usually simply known as Rembrandt, was a Dutch Golden Age painter, printmaker and draughtsman. An innovative and prolific master in three media, he is generally considered one of the greatest visual artists in the history of art and the most important in Dutch art history.",
    image: "https://res.cloudinary.com/creatives-around/image/upload/v1658340242/atrsy-web-app-project/p0acar5tyqerwb0khkmg.jpg"
  },
  {
    name: "Sandro Botticelli",
    nationality: "Italian",
    birth: 1445,
    death: 1510,
    about:
      "At the height of his fame, the Florentine painter and draughtsman Sandro Botticelli was one of the most esteemed artists in Italy. His graceful pictures of the Madonna and Child, his altarpieces and his life-size mythological paintings, such as 'Venus and Mars', were immensely popular in his lifetime.",
    image: "https://res.cloudinary.com/creatives-around/image/upload/v1658340204/atrsy-web-app-project/kpxj9yutushxhd3qzxd9.jpg"
  },
  {
    name: "Pablo Ruiz Picasso",
    nationality: "Spanish",
    birth: 1881,
    death: 1973,
    about:
      "Pablo Picasso was a Spanish painter, sculptor, printmaker, ceramicist and stage designer considered one of the greatest and most influential artists of the 20th century. Picasso is credited, along with Georges Braque, with the creation of Cubism.",
    image: "https://res.cloudinary.com/creatives-around/image/upload/v1658340169/atrsy-web-app-project/bsnks1gckikx3y550llm.jpg"
  },
  {
    name: "Oscar-Claude Monet",
    nationality: "French",
    birth: 1840,
    death: 1926,
    about:
      "French painter who was the initiator, leader, and unswerving advocate of the Impressionist style.",
    image: "https://res.cloudinary.com/creatives-around/image/upload/v1658340123/atrsy-web-app-project/nrowacssraqohvcerca5.jpg"
  },

  {
    name: "Magdalena Carmen Frida Kahlo",
    nationality: "Mexican",
    birth: 1907,
    death: 1954,
    about:
      "Frida Kahlo was a Mexican painter best known for her uncompromising and brilliantly colored self-portraits that deal with such themes as identity, the human body, and death. Although she denied the connection, she is often identified as a Surrealist.",
    image: "https://res.cloudinary.com/creatives-around/image/upload/v1658340034/atrsy-web-app-project/dvamsifvkbdhi3xhnagq.jpg"
  },
  {
    name: "Leonardo da Vinci",
    nationality: "Italian",
    birth: 1452,
    death: 1519,
    about:
      "Leonardo da Vinci was a Renaissance painter, sculptor, architect, inventor, military engineer and draftsman — the epitome of a true Renaissance man. Gifted with a curious mind and a brilliant intellect, da Vinci studied the laws of science and nature, which greatly informed his work.",
    image: "https://res.cloudinary.com/creatives-around/image/upload/v1658339994/atrsy-web-app-project/xhgjsmvq5wbucyctdbd9.jpg"
  },
  {
    name: "Salvador Domingo Felipe Jacinto Dali",
    nationality: "Spanish",
    birth: 1904,
    death: 1989,
    about:
      "Salvador Dalí was a Spanish Surrealist painter and printmaker known for exploring subconscious imagery. Arguably, his most famous painting is The Persistence of Memory (1931), depicting limp melting watches.",
    image: "https://res.cloudinary.com/creatives-around/image/upload/v1658341691/atrsy-web-app-project/oe6eeqdnylnxe9q2yjrj.jpg"
  },
  {
    name: "Jean Dominique Antony Metzinger",
    nationality: "French",
    birth: 1883,
    death: 1956,
    about:
      "Jean Dominique Antony Metzinger (French: [mɛtsɛ̃ʒe]; 24 June 1883 - 3 November 1956) was a major 20th-century French painter, theorist, writer, critic and poet, who along with Albert Gleizes wrote the first theoretical work on Cubism. His earliest works, from 1900 to 1904, were influenced by the neo-Impressionism of Georges Seurat and Henri-Edmond Cross. Between 1904 and 1907 Metzinger worked in the Divisionist and Fauvist styles with a strong Cézannian component, leading to some of the first proto-Cubist works.",
    image: "https://res.cloudinary.com/creatives-around/image/upload/v1658390257/atrsy-web-app-project/cdx8ibnspxtxvbnfjbqa.jpg"
  },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return Artist.create(artists);
  })
  .then((artistsCreated) => {
    console.log(`Number of artists created... ${artistsCreated.length} `);

    const promises = arts.map((art) => {
      return Artist.findOne({ name: art.artist })
        .then((artist) => {
          art.artist = artist._id;
          return art;
        })
        .then((artUpdated) => {
          return Art.create(artUpdated);
        });
    });
    return Promise.all(promises);
  })
  .then((artsCreated) => {
    console.log(`Number of arts created... ${artsCreated.length} `);

    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(`An error occurred while creating arts from the DB: ${err}`);
  });
