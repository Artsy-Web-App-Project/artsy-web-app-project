const { Schema, model } = require("mongoose");


const artistSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        nationality: String,
        birth: Date,
        death: Date,
        about: String
    },
    {
        timestamps: true
    }
);

const Artist = model("Artist", artistSchema);

module.exports = Artist;