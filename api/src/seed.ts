import mongoose from "mongoose";
import { User } from "./models/User.js";
import { Artist } from "./models/Artist.js";
import { Album } from "./models/Album.js";
import { Track } from "./models/Track.js";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

const run = async () => {
  await mongoose.connect("mongodb://localhost/requratedb");
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
    await db.dropCollection("trackhistories");
  } catch (e) {
    console.log("Collections are empty or not found, skipping this drops.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("kyro", salt);

  const [adminUser, regularUser] = await Promise.all([
    User.create({
      username: "admin",
      password: hashedPassword,
      token: randomUUID(),
      role: "admin",
    }),
    User.create({
      username: "baiteli",
      password: hashedPassword,
      token: randomUUID(),
      role: "user",
    }),
  ]);

  const [artist1, artist2] = await Promise.all([
    Artist.create({
      name: "THRILL PILL",
      info: "Russian Hip Hop rapper from band DECEPTICONS, trendsetter of many music genres and creator of TRAP HOUSE.",
      photo: "thrillpill.jpg",
      isPublished: true,
      user: adminUser._id,
    }),
    Artist.create({
      name: "ONDA ANDAR",
      info: "Russian Hip Hop rapper with cold and experimental music, prev name was ШИПЫ.",
      photo: "ondaandar.jpg",
      isPublished: true,
      user: adminUser._id,
    }),
  ]);

  const [album1, album2, album3, album4] = await Promise.all([
    Album.create({
      name: "ИСКРЕННЕ Я",
      artist: artist1._id,
      year: 2023,
      photo: "silencereme.PNG",
      isPublished: true,
      user: adminUser._id,
    }),
    Album.create({
      name: "CHELSEA 3",
      artist: artist1._id,
      year: 2022,
      photo: "chelsea3.png",
      isPublished: true,
      user: adminUser._id,
    }),
    Album.create({
      name: "KIDSCRY2DAY",
      artist: artist2._id,
      year: 2026,
      photo: "kidscry2day.png",
      isPublished: true,
      user: adminUser._id,
    }),
    Album.create({
      name: "#pharaohseason",
      artist: artist2._id,
      year: 2024,
      photo: "pharaohseason.png",
      isPublished: true,
      user: adminUser._id,
    }),
  ]);

  const publishedTracks = [
    {
      name: "Моя вина!",
      album: album1._id,
      duration: "3:05",
      number: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Умираю 2!",
      album: album1._id,
      duration: "2:37",
      number: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Железо",
      album: album1._id,
      duration: "3:29",
      number: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Тело",
      album: album1._id,
      duration: "3:04",
      number: 4,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Тысяча глаз",
      album: album1._id,
      duration: "3:09",
      number: 5,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Челси 3",
      album: album2._id,
      duration: "0:13",
      number: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "2017",
      album: album2._id,
      duration: "3:08",
      number: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Jopa",
      album: album2._id,
      duration: "3:34",
      number: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "kicki",
      album: album2._id,
      duration: "2:55",
      number: 4,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Буква L",
      album: album2._id,
      duration: "2:44",
      number: 5,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "kidscry2day",
      album: album3._id,
      duration: "3:05",
      number: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "sleep mode",
      album: album3._id,
      duration: "2:37",
      number: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "herons",
      album: album3._id,
      duration: "3:29",
      number: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "XS",
      album: album3._id,
      duration: "3:04",
      number: 4,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "prop hunt",
      album: album3._id,
      duration: "3:09",
      number: 5,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Неон Фараон",
      album: album4._id,
      duration: "3:05",
      number: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Низко",
      album: album4._id,
      duration: "2:37",
      number: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Amen98",
      album: album4._id,
      duration: "3:29",
      number: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Wings",
      album: album4._id,
      duration: "3:04",
      number: 4,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
    {
      name: "Привидение краш тест",
      album: album4._id,
      duration: "3:09",
      number: 5,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: true,
      user: adminUser._id,
    },
  ];

  const artist3 = await Artist.create({
    name: "COWBOYCLICKER",
    info: "Russian hip hop artist crafting dark underground soundscapes with signature English aesthetic branding.",
    photo: "cowboyclicker.jpg",
    isPublished: false,
    user: regularUser._id,
  });

  const album5 = await Album.create({
    name: "0",
    artist: artist3._id,
    year: 2026,
    photo: "cowboyclickeralbumzero.jpg",
    isPublished: false,
    user: regularUser._id,
  });

  const unpublishedTracks = [
    {
      name: "FRONTSHOTS BACKSHOTS SIDESHOTS",
      album: album5._id,
      duration: "2:45",
      number: 1,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: false,
      user: regularUser._id,
    },
    {
      name: "FU*K YOU",
      album: album5._id,
      duration: "2:50",
      number: 2,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: false,
      user: regularUser._id,
    },
    {
      name: "WHITEBOARD",
      album: album5._id,
      duration: "3:02",
      number: 3,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: false,
      user: regularUser._id,
    },
    {
      name: "RUSSIAN ROULETTE",
      album: album5._id,
      duration: "3:30",
      number: 4,
      youtubeUrl: "https://www.youtube.com/watch?v=VWa9mYjVh28",
      isPublished: false,
      user: regularUser._id,
    },
  ];

  await Track.insertMany([...publishedTracks, ...unpublishedTracks]);

  console.log("Fixtures created successfully!");
  await mongoose.connection.close();
};

run().catch((err) => {
  console.error("Error running fixtures:", err);
  mongoose.connection.close();
});
