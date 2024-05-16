import express from "express";
import { config } from "dotenv";
import { router } from "./routes/index.js";
import passport from "passport";
import { COOKIE_MAX_AGE, COOKIE_NAME } from "./config/cookies.js";
import session from "express-session";
import "./config/passport.js";
const app = express();
config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: COOKIE_NAME,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: COOKIE_MAX_AGE,
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
