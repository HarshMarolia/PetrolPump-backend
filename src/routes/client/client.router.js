import express from "express";
import {
  httpGetClients,
  httpGetClientById,
  httpCreateClient,
  httpUpdateClient,
  httpDeleteClient,
} from "./client.controller.js";
import { isUserAuthenticated } from "../../middlewares/authenticate.js";

const clientRouter = express.Router();

clientRouter.get("/", isUserAuthenticated, httpGetClients);
clientRouter.post("/", isUserAuthenticated, httpCreateClient);
clientRouter.get("/:id", isUserAuthenticated, httpGetClientById);
clientRouter.put("/:id", isUserAuthenticated, httpUpdateClient);
clientRouter.delete("/:id", isUserAuthenticated, httpDeleteClient);

export default clientRouter;
