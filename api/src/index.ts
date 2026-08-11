import express from "express";
import cors from "cors";
import mongoose from "mongoose";
//tut dobavly route importi

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//tut route roditelski
app.use("/");

const run = async () => {
  await mongoose.connect("mongodb://localhost/requratedb");
  console.log("DB connected successfully");

  app.listen(port, () => {
    console.log(`Server start and listening at port ${port}`);
  });
};

run();
