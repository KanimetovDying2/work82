import { Router } from "express";
import { Artist } from "../models/Artist.js";
import { upload } from "../multer.js";

const artistsRouter = Router();

artistsRouter.get("/artists", async (req, res) => {
  try {
    const artistsData = await Artist.find({});

    return res.json({ artistsData });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend get error." });
  }
});

artistsRouter.post("/artists", upload.single("photo"), async (req, res) => {
  try {
    const { name, info } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Name is required!" });
    }

    const newArtist = await Artist.create({
      name,
      info,
      photo,
    });

    return res.status(201).json(newArtist);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Backend post error." });
  }
});

export default artistsRouter;
