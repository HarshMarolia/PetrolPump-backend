import express from "express";
import {
  httpGetClients,
  httpGetClientById,
  httpCreateClient,
  httpUpdateClient,
  httpDeleteClient,
} from "./client.controller.js";
import { isAdminAuthenticated } from "../../middlewares/authenticate.js";

const clientRouter = express.Router();

clientRouter.get("/", isAdminAuthenticated, httpGetClients);
clientRouter.get("/:id", isAdminAuthenticated, httpGetClientById);
clientRouter.post("/", isAdminAuthenticated, httpCreateClient);
clientRouter.put("/:id", isAdminAuthenticated, httpUpdateClient);
clientRouter.delete("/:id", isAdminAuthenticated, httpDeleteClient);

export default clientRouter;
