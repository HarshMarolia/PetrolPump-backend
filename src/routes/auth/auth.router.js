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

// Use a custom authenticate callback so we can return clear JSON responses
// instead of redirects or opaque responses from passport.
authRouter.post("/login", (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ message: "Server error during authentication" });
    }

    if (!user) {
      // info may contain messages from strategy; prefer a helpful message
      const message = (info && info.message) || "Invalid email or password";
      return res.status(401).json({ message });
    }

    // req.logIn establishes a session
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error("Login error:", loginErr);
        return res.status(500).json({ message: "Failed to establish session" });
      }

      // Delegate to controller to return user info and cookies
      return httpLogin(req, res);
    });
  })(req, res, next);
});

authRouter.get("/logout", httpLogout);
authRouter.post("/forgot-password", httpForgotPassword);
authRouter.post("/reset-password", httpUpdatePassword);

export default authRouter;
