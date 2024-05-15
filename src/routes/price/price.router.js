import express from "express";
import {
  httpCreatePriceIndicator,
  httpGetPriceIndicator,
  httpUpdatePetrolPriceIndicator,
  httpUpdateDeieselPriceIndicator,
} from "./price.controller.js";

const priceRouter = express.Router();

priceRouter.get("/", httpGetPriceIndicator);
priceRouter.post("/create", httpCreatePriceIndicator);
priceRouter.put("/petrol", httpUpdatePetrolPriceIndicator);
priceRouter.put("/diesel", httpUpdateDeieselPriceIndicator);

export default priceRouter;
