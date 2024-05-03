import express from "express";
import { config } from "dotenv";
import { router } from "./routes/index.js";

const app = express();
config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/api/", router);

const { PORT } = process.env;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

export { startServer };
