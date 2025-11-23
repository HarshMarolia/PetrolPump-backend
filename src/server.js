import express from "express";
import { config } from "dotenv";
import { router } from "./routes/index.js";
import passport from "passport";
import { COOKIE_MAX_AGE, COOKIE_NAME } from "./config/cookies.js";
import session from "express-session";
import MongoStore from "connect-mongo";
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
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      ttl: Math.floor(COOKIE_MAX_AGE / 1000),
      autoRemove: "native",
    }),
    cookie: {
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: true, //true in production
      httpOnly: true, //true in production
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/v1/api/", router);

// Global error handler - must be after all routes
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== "production";
  
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(isDevelopment && { stack: err.stack }),
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

const { PORT } = process.env;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

export { startServer };
