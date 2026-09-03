import { Router } from "express";
import { Album } from "../models/Album.js";
import { upload } from "../multer.js";
import { auth, permit, tryAuth } from "../middleware/auth.js";
import { RequestWithUser } from "../types.js";

const albumsRouter = Router();

albumsRouter.get("/albums", tryAuth, async (req: RequestWithUser, res) => {
  try {
    const artistQuery = req.query.artist;
    const filter: any = {};

    if (typeof artistQuery === "string") {
      filter.artist = artistQuery;
    }

    if (!req.user || req.user.role !== "admin") {
      filter.$or = [
        { isPublished: true },
        ...(req.user ? [{ user: req.user._id }] : []),
      ];
    }

    const albumsData = await Album.find(filter)
      .sort({ year: -1 })
      .populate("artist");

    return res.json({ albumsData });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend get error." });
  }
});

albumsRouter.post(
  "/albums",
  auth,
  upload.single("photo"),
  async (req: RequestWithUser, res) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const { name, artist, year } = req.body;
      const photo = req.file ? req.file.filename : null;

      if (
        !name ||
        typeof name !== "string" ||
        name.trim() === "" ||
        !artist ||
        !year
      ) {
        return res
          .status(400)
          .json({ message: "Name, artist and year are required!" });
      }

      const newAlbum = await Album.create({
        name,
        artist,
        year,
        photo,
        isPublished: false,
        user: req.user._id,
      });

      return res.status(201).json(newAlbum);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Backend post error." });
    }
  },
);

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

albumsRouter.patch(
  "/albums/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).send({ error: "Album not found" });
      }

      album.isPublished = !album.isPublished;
      await album.save();

      return res.send({ message: "Status toggled", album });
    } catch (e) {
      return next(e);
    }
  },
);

albumsRouter.delete(
  "/albums/:id",
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).send({ error: "Album not found" });
      }

      if (req.user.role !== "admin") {
        if (
          album.user.toString() !== req.user._id.toString() ||
          album.isPublished
        ) {
          return res.status(403).send({ error: "Access denied" });
        }
      }

      await Album.deleteOne({ _id: album._id });
      return res.send({ message: "Album deleted successfully" });
    } catch (e) {
      return next(e);
    }
  },
);

export default albumsRouter;
