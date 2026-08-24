import { Router } from "express";
import { TrackHistory } from "../models/TrackHistory.js";
import { Track } from "../models/Track.js";
import { Album } from "../models/Album.js";
import { auth } from "../middleware/auth.js";
import { RequestWithUser } from "../types.js";

const tracksHistories = Router();

tracksHistories.post(
  "/track_histories",
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const { track: trackId } = req.body;

      if (!trackId) {
        return res.status(400).send({ error: "Track id is required" });
      }

      const track = await Track.findById(trackId);
      if (!track) {
        return res.status(404).send({ error: "Track not found" });
      }

      const album = await Album.findById(track.album);
      if (!album) {
        return res.status(404).send({ error: "Album not found" });
      }

      const trackHistory = new TrackHistory({
        user: req.user._id,
        track: trackId,
        artist: album.artist,
        datetime: new Date(),
      });

      await trackHistory.save();
      return res.status(201).send(trackHistory);
    } catch (e) {
      return next(e);
    }
  },
);

tracksHistories.get(
  "/track_histories",
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const histories = await TrackHistory.find({ user: req.user._id })
        .populate("track")
        .populate("artist")
        .sort({ datetime: -1 });

      return res.send(histories);
    } catch (e) {
      return next(e);
    }
  },
);

export default tracksHistories;
