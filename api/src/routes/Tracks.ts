import { Router } from "express";
import { Track } from "../models/Track.js";
import { Album } from "../models/Album.js";
import { auth, permit, tryAuth } from "../middleware/auth.js";
import { RequestWithUser } from "../types.js";

const tracksRouter = Router();

tracksRouter.get("/tracks", tryAuth, async (req: RequestWithUser, res) => {
  try {
    const albumQuery = req.query.album;
    const artistQuery = req.query.artist;

    const filter: any = {};

    if (typeof albumQuery === "string") {
      filter.album = albumQuery;
    } else if (typeof artistQuery === "string") {
      const albumsData = await Album.find({ artist: artistQuery });
      const albumsId = albumsData.map((album) => album._id);
      filter.album = { $in: albumsId };
    }

    if (!req.user || req.user.role !== "admin") {
      filter.$or = [
        { isPublished: true },
        ...(req.user ? [{ user: req.user._id }] : []),
      ];
    }

    const tracksData = await Track.find(filter).sort({ number: 1 });

    return res.json({ tracksData });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend get error." });
  }
});

tracksRouter.post("/tracks", auth, async (req: RequestWithUser, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const { name, album, duration, number } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === "" ||
      !album ||
      !duration ||
      number === undefined
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newTrack = new Track({
      name,
      album,
      duration,
      number,
      isPublished: false,
      user: req.user._id,
    });

    await newTrack.save();
    return res.status(201).json(newTrack);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend post error." });
  }
});

tracksRouter.patch(
  "/tracks/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const track = await Track.findById(req.params.id);
      if (!track) {
        return res.status(404).send({ error: "Track not found" });
      }

      track.isPublished = !track.isPublished;
      await track.save();

      return res.send({ message: "Status toggled", track });
    } catch (e) {
      return next(e);
    }
  },
);

tracksRouter.delete(
  "/tracks/:id",
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const track = await Track.findById(req.params.id);
      if (!track) {
        return res.status(404).send({ error: "Track not found" });
      }

      if (req.user.role !== "admin") {
        if (
          track.user.toString() !== req.user._id.toString() ||
          track.isPublished
        ) {
          return res.status(403).send({ error: "Access denied" });
        }
      }

      await Track.deleteOne({ _id: track._id });
      return res.send({ message: "Track deleted successfully" });
    } catch (e) {
      return next(e);
    }
  },
);

export default tracksRouter;
