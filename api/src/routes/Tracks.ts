import { Router } from "express";
import { Track } from "../models/Track.js";
import { Album } from "../models/Album.js";

const tracksRouter = Router();

tracksRouter.get("/tracks", async (req, res) => {
  try {
    const albumQuery = req.query.album;
    const artistQuery = req.query.artist;

    const filter: { album?: string | { $in: any[] } } = {};

    if (typeof albumQuery === "string") {
      filter.album = albumQuery;
    } else if (typeof artistQuery === "string") {
      const albumsData = await Album.find({ artist: artistQuery });

      const albumsId = albumsData.map((album) => album._id);

      filter.album = { $in: albumsId };
    }

    const tracksData = await Track.find(filter).sort({ number: 1 });

    return res.json({ tracksData });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend get error." });
  }
});

tracksRouter.post("/tracks", async (req, res) => {
  try {
    const { name, album, duration, number } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      name.trim() === "" ||
      !album ||
      !duration ||
      !number === undefined
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newTrack = new Track({
      name,
      album,
      duration,
      number,
    });

    await newTrack.save();
    return res.json(newTrack);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend post error." });
  }
});

export default tracksRouter;
