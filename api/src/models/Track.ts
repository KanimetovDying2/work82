import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  youtubeUrl: {
    type: String,
    default: null,
  },
});

export const Track = mongoose.model("Track", TrackSchema);
