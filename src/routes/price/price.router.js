import express from "express";
import {
  httpCreatePriceIndicator,
  httpGetPriceIndicator,
  httpUpdatePetrolPriceIndicator,
  httpUpdateDeieselPriceIndicator,
} from "./price.controller.js";
import { isAdminAuthenticated } from "../../middlewares/authenticate.js";

const priceRouter = express.Router();

priceRouter.get("/", isAdminAuthenticated, httpGetPriceIndicator);
priceRouter.post("/create", isAdminAuthenticated, httpCreatePriceIndicator);
priceRouter.put(
  "/petrol",
  isAdminAuthenticated,
  httpUpdatePetrolPriceIndicator
);
priceRouter.put(
  "/diesel",
  isAdminAuthenticated,
  httpUpdateDeieselPriceIndicator
);

export default priceRouter;
