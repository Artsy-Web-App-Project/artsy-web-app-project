const { Schema, model } = require("mongoose");


const artSchema = new Schema(
    {
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: String,
        year: String,
        artist: {
            type: Schema.Types.ObjectId,
            ref: "Artist",
            required: true
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
