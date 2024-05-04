import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.APP_PORT) {
    throw new Error("APP_PORT must be defined");
  }

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  
  if (!process.env.MONGO_URI) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
    throw err;
  }

  app.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}`);
  });
};

start();
