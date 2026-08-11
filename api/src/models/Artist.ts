import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    default: null,
  },
  info: {
    type: String,
    default: null,
  },
});

export const Artist = mongoose.model("Artist", ArtistSchema);
