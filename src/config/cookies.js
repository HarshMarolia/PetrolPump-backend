import { config } from "dotenv";
config();
export const COOKIE_NAME = process.env.COOKIE_NAME;
export const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const FRONTEND_URL = process.env.FRONTEND_URL;