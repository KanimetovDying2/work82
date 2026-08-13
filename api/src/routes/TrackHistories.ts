import { Router } from "express";
import { TrackHistory } from "../models/TrackHistory.js";
import { User } from "../models/User.js";

const tracksHistories = Router();

tracksHistories.post("/track_history", async (req, res) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(401).send({ error: "No token present" });
  }

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(401).send({ error: "Wrong token" });
  }

  try {
    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
      datetime: new Date(),
    });

    await trackHistory.save();
    return res.send(trackHistory);
  } catch (e) {
    return res.status(400).send(e);
  }
});

export default tracksHistories;
