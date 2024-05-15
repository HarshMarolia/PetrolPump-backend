import express from "express";
import { httpAuthenticateUser } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/", httpAuthenticateUser);

export default authRouter;
