import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserFields, UserMethods, UserModel } from "../types.js";

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.generateToken = function () {
  this.token = crypto.randomUUID();
};

UserSchema.methods.checkPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export const User = model<UserFields, UserModel>("User", UserSchema);
