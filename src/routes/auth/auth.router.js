import express from "express";
import { httpLogin, httpLogout } from "./auth.controller.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/login", passport.authenticate("local"), httpLogin);
authRouter.get("/logout", httpLogout);

export default authRouter;
