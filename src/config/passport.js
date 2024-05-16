import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserById,
  findUserByPhoneNumber,
} from "../models/user/user.model.js";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByPhoneNumber(username);

      if (!user) return done(null, false);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getUserById(id);
  done(null, user);
});

