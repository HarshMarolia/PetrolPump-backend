import express from "express";
import {
  httpGetNews,
  httpGetNewsByCity,
  httpGetNewsByState,
  httpCreateNews,
  httpDeleteNews,
} from "./news.controller.js";

const newsRouter = express.Router();

newsRouter.get("/", httpGetNews);
newsRouter.post("/", httpCreateNews);
newsRouter.get("/city/:city", httpGetNewsByCity);
newsRouter.get("/state/:state", httpGetNewsByState);
newsRouter.delete("/:id", httpDeleteNews);

export default newsRouter;
