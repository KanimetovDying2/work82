import { Router } from "express";
import { Artist } from "../models/Artist.js";
import { Album } from "../models/Album.js";
import { Track } from "../models/Track.js";
import { upload } from "../multer.js";
import { auth, permit, tryAuth } from "../middleware/auth.js";
import { RequestWithUser } from "../types.js";

const artistsRouter = Router();

artistsRouter.get("/artists", tryAuth, async (req: RequestWithUser, res) => {
  try {
    let filter: any = {};

    if (!req.user || req.user.role !== "admin") {
      filter = {
        $or: [
          { isPublished: true },
          ...(req.user ? [{ user: req.user._id }] : []),
        ],
      };
    }

    const artistsData = await Artist.find(filter);
    return res.json({ artistsData });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend get error." });
  }
});

artistsRouter.post(
  "/artists",
  auth,
  upload.single("photo"),
  async (req: RequestWithUser, res) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const { name, info } = req.body;
      const photo = req.file ? req.file.filename : null;

      if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ message: "Name is required!" });
      }

      const newArtist = await Artist.create({
        name,
        info,
        photo,
        isPublished: false, 
        user: req.user._id,
      });

      return res.status(201).json(newArtist);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Backend post error." });
    }
  },
);

artistsRouter.patch(
  "/artists/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const artist = await Artist.findById(req.params.id);
      if (!artist) {
        return res.status(404).send({ error: "Artist not found" });
      }

      artist.isPublished = !artist.isPublished;
      await artist.save();

      return res.send({ message: "Status toggled", artist });
    } catch (e) {
      return next(e);
    }
  },
);

artistsRouter.delete(
  "/artists/:id",
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const artist = await Artist.findById(req.params.id);
      if (!artist) {
        return res.status(404).send({ error: "Artist not found" });
      }

      if (req.user.role !== "admin") {
        if (
          artist.user.toString() !== req.user._id.toString() ||
          artist.isPublished
        ) {
          return res.status(403).send({ error: "Access denied" });
        }
      }

      await Artist.deleteOne({ _id: artist._id });
      return res.send({ message: "Artist deleted successfully" });
    } catch (e) {
      return next(e);
    }
  },
);

export default artistsRouter;
