import { Router } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { auth } from "../middleware/auth.js";
import { RequestWithUser } from "../types.js";

const usersRouter = Router();

usersRouter.post("/users", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      token: randomUUID(),
      role: "user",
    });
    await user.save();
    return res.status(201).send(user);
  } catch (e) {
    return next(e);
  }
});

usersRouter.post("/users/sessions", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({ error: "Username not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Wrong password" });
    }

    user.token = randomUUID();
    await user.save();

    return res.send({ message: "Login success", token: user.token, user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete(
  "/users/sessions",
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      req.user.token = randomUUID();
      await req.user.save();

      return res.send({ message: "Logged out successfully" });
    } catch (e) {
      return next(e);
    }
  },
);

export default usersRouter;
