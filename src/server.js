import express from "express";
import { config } from "dotenv";
import { router } from "./routes/index.js";
import passport from "passport";
import { COOKIE_MAX_AGE, COOKIE_NAME } from "./config/cookies.js";
import session from "express-session";
import "./config/passport.js";
import cors from "cors";
const app = express();
config();

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  app.set("trust proxy", 1);
}

const allowOrigins = [process.env.FRONTEND_URL];
app.use(
  cors({
    origin: allowOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: COOKIE_NAME,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: COOKIE_MAX_AGE,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/v1/api/", router);

const { PORT } = process.env;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

export { startServer };
