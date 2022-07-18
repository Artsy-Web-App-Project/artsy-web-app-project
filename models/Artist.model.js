const { Schema, model } = require("mongoose");


const artistSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        nationality: String,
        birth: Number,
        death: Number,
        about: String
    },
    {
        timestamps: true
    }
);

const Artist = model("Artist", artistSchema);

module.exports = Artist;