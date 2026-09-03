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
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Track = mongoose.model("Track", TrackSchema);
