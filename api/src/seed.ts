import mongoose from "mongoose";
import { User } from "./models/User.js";
import { Artist } from "./models/Artist.js";
import { Album } from "./models/Album.js";
import { Track } from "./models/Track.js";
import { randomUUID } from "crypto";

const run = async () => {
  await mongoose.connect("mongodb://localhost/requratedb");
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
  } catch (e) {
    console.log("Collections is empty or not found, skipping this drops.");
  }

  await new User({
    username: "baiteli",
    password: "kyro",
    token: randomUUID(),
  }).save();

  const [artist1, artist2] = await Promise.all([
    Artist.create({
      name: "THRILL PILL",
      info: "Russian Hip Hop rapper from band ZAKAT99, creator of TRAP HOUSE.",
      photo: "thrillpill.jpg",
    }),
    Artist.create({
      name: "ONDA ANDAR",
      info: "Russian Hip Hop rapper, prev name was ШИПЫ.",
      photo: "ondaandar.jpg",
    }),
  ]);

  const [album1, album2, album3, album4] = await Promise.all([
    Album.create({
      name: "ИСКРЕННЕ Я",
      artist: artist1._id,
      year: 2023,
      photo: "silencereme.PNG",
    }),
    Album.create({
      name: "CHELSEA 3",
      artist: artist1._id,
      year: 2022,
      photo: "chelsea3.png",
    }),

    Album.create({
      name: "KIDSCRY2DAY",
      artist: artist2._id,
      year: 2026,
      photo: "kidscry2day.png",
    }),
    Album.create({
      name: "#pharaohseason",
      artist: artist2._id,
      year: 2024,
      photo: "pharaohseason.png",
    }),
  ]);

  const tracksData = [
    {
      name: "Моя вина!",
      album: album1._id,
      duration: "3:05",
      number: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Умираю 2!",
      album: album1._id,
      duration: "2:37",
      number: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Железо",
      album: album1._id,
      duration: "3:29",
      number: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Тело",
      album: album1._id,
      duration: "3:04",
      number: 4,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Тысяча глаз",
      album: album1._id,
      duration: "3:09",
      number: 5,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },

    {
      name: "Челси 3",
      album: album2._id,
      duration: "0:13",
      number: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "2017",
      album: album2._id,
      duration: "3:08",
      number: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Jopa",
      album: album2._id,
      duration: "3:34",
      number: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "kicki",
      album: album2._id,
      duration: "2:55",
      number: 4,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Буква L",
      album: album2._id,
      duration: "2:44",
      number: 5,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },

    {
      name: "kidscry2day",
      album: album3._id,
      duration: "3:05",
      number: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "sleep mode",
      album: album3._id,
      duration: "2:37",
      number: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "herons",
      album: album3._id,
      duration: "3:29",
      number: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "XS",
      album: album3._id,
      duration: "3:04",
      number: 4,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "prop hunt",
      album: album3._id,
      duration: "3:09",
      number: 5,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },

    {
      name: "Неон Фараон",
      album: album4._id,
      duration: "3:05",
      number: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Низко",
      album: album4._id,
      duration: "2:37",
      number: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Amen98",
      album: album4._id,
      duration: "3:29",
      number: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Wings",
      album: album4._id,
      duration: "3:04",
      number: 4,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
    {
      name: "Привидение краш тест",
      album: album4._id,
      duration: "3:09",
      number: 5,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
    },
  ];

  await Track.insertMany(tracksData);

  console.log("Fixtures created success!");
  await mongoose.connection.close();
};

run().catch((err) => {
  console.error("Error run fixtures:", err);
  mongoose.connection.close();
});
