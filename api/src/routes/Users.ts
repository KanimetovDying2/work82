import { Router } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

const usersRouter = Router();

usersRouter.post("/users", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      token: randomUUID(),
    });
    await user.save();
    return res.send(user);
  } catch (e) {
    return res.status(400).json({ message: "Error, wrong request" });
  }
});

usersRouter.post("/users/sessions", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({ error: "Error, username not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Wrong password" });
    }

    user.token = randomUUID();
    await user.save();

    return res.send({ message: "Login success", token: user.token });
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default usersRouter;