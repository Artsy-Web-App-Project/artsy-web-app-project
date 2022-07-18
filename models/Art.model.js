const { Schema, model } = require("mongoose");


const artSchema = new Schema(
    {
        image: {
            type: String,
        },
        title: {
            type: String,
            required: true
        },
        description: String,
        year: Number,
        artist: {
            type: Schema.Types.ObjectId,
            ref: "Artist"
        },
        location: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Art = model("Art", artSchema);

module.exports = Art;
