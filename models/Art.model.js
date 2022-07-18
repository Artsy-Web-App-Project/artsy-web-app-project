const { Schema, model } = require("mongoose");

const artSchema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    year: Number,
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
    },
  },
  {
    timestamps: true,
  }
);

// Geocode & create location
artSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };
  this.address = undefined;
  next();
});

const Art = model("Art", artSchema);

module.exports = Art;
