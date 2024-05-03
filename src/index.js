import { startServer } from "./server.js";
import mongoose from "mongoose";
import dotenv  from "dotenv";

dotenv.config();

mongoose.connection.once("open", () => {
  console.log("Mongodb connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error("Error in connection to mongoose", err);
});

const startApp = async () => {
  let uri = process.env.MONGODB_URL;
  await mongoose.connect(uri);
  startServer();
};

startApp();