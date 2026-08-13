import { Router } from "express";
import { Album } from "../models/Album.js";
import { upload } from "../multer.js";

const albumsRouter = Router();

albumsRouter.get("/albums", async (req, res) => {
  try {
    const artistQuery = req.query.artist;
    const filter: { artist?: string } = {};

    if (typeof artistQuery === "string") {
      filter.artist = artistQuery;
    }
    const albumsData = await Album.find(filter).populate("artist");
    return res.json({ albumsData });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend get error." });
  }
});

albumsRouter.post("/albums", upload.single("photo"), async (req, res) => {
  try {
    const { name, artist, year } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!name || !artist || !year) {
      return res
        .status(400)
        .json({ message: "Name, artist and year are required!" });
    }

    const newAlbum = await Album.create({
      name,
      artist,
      year,
      photo,
    });

    return res.status(201).json(newAlbum);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend post error." });
  }
});

albumsRouter.get("/albums/:id", async (req, res) => {
  try {
    const albumId = req.params.id;

    if (!albumId) {
      return res.status(404).json({ message: "Album not found!" });
    }

    const foundAlbum = await Album.findById(albumId).populate("artist");
    return res.json({ foundAlbum });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend get by id error" });
  }
});

export default albumsRouter;
