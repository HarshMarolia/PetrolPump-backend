import express from "express";
import {
  httpGetClients,
  httpGetClientById,
  httpCreateClient,
  httpUpdateClient,
  httpDeleteClient,
} from "./client.controller.js";

const clientRouter = express.Router();

clientRouter.get("/", httpGetClients);
clientRouter.get("/:id", httpGetClientById);
clientRouter.post("/", httpCreateClient);
clientRouter.put("/:id", httpUpdateClient);
clientRouter.delete("/:id", httpDeleteClient);

export default clientRouter;
