import express from "express";
import {
  httpLogin,
  httpLogout,
  httpUpdatePassword,
  httpForgotPassword,
} from "./auth.controller.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.get("/login", httpLogin);
authRouter.post("/login", passport.authenticate("local"), httpLogin);
authRouter.get("/logout", httpLogout);
authRouter.post("/forgot-password", httpForgotPassword);
authRouter.post("/reset-password", httpUpdatePassword);

export default authRouter;
