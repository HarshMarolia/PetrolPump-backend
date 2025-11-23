import express from "express";
import {
  httpGetNews,
  httpGetNewsByCity,
  httpGetNewsByState,
  httpCreateNews,
  httpDeleteNews,
} from "./news.controller.js";
import { isUserAuthenticated, isSuperUserAuthenticated, isAdminAuthenticated } from "../../middlewares/authenticate.js";

const newsRouter = express.Router();

newsRouter.get("/", isUserAuthenticated, httpGetNews);
newsRouter.post("/", isSuperUserAuthenticated, httpCreateNews);
newsRouter.get("/city/:city", isUserAuthenticated, httpGetNewsByCity);
newsRouter.get("/state/:state", isUserAuthenticated, httpGetNewsByState);
newsRouter.delete("/:id", isAdminAuthenticated, httpDeleteNews);

export default newsRouter;
