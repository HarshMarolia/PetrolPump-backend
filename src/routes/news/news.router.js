import express from "express";
import {
  httpGetNews,
  httpGetNewsByCity,
  httpGetNewsByState,
  httpCreateNews,
  httpDeleteNews,
} from "./news.controller.js";
import { isAdminAuthenticated } from "../../middlewares/authenticate.js";

const newsRouter = express.Router();

newsRouter.get("/", isAdminAuthenticated, httpGetNews);
newsRouter.post("/", isAdminAuthenticated, httpCreateNews);
newsRouter.get("/city/:city", isAdminAuthenticated, httpGetNewsByCity);
newsRouter.get("/state/:state", isAdminAuthenticated, httpGetNewsByState);
newsRouter.delete("/:id", isAdminAuthenticated, httpDeleteNews);

export default newsRouter;
