import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import artistsRouter from "./routes/Artists.js";
import albumsRouter from "./routes/Albums.js";
import tracksRouter from "./routes/Tracks.js";
import usersRouter from "./routes/Users.js";
import tracksHistories from "./routes/TrackHistories.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(artistsRouter);
app.use(albumsRouter);
app.use(tracksRouter);
app.use(tracksHistories);
app.use(usersRouter);

const run = async () => {
  await mongoose.connect("mongodb://localhost/requratedb");
  console.log("DB connected successfully");

  app.listen(port, () => {
    console.log(`Server start and listening at port ${port}`);
  });
};

run();
