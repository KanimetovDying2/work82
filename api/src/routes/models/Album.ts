import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    default: null,
  },
});

export const Album = mongoose.model("Album", AlbumSchema);
