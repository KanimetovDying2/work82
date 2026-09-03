import { Response, NextFunction } from "express";
import { RequestWithUser } from "../types.js";
import { User } from "../models/User.js";

export const auth = async (
  expressReq: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = expressReq.get("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    expressReq.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export const permit = (...roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    next();
  };
};

export const tryAuth = async (
  expressReq: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = expressReq.get("Authorization");
    if (token) {
      const user = await User.findOne({ token });
      if (user) {
        expressReq.user = user;
      }
    }
    next();
  } catch (e) {
    next(e);
  }
};