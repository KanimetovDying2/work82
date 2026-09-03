import { Request } from "express";
import { HydratedDocument, Model } from "mongoose";

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: "admin" | "user";
}

export type UserWithoutId = Omit<UserFields, "token">;

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields, UserMethods>;
}
