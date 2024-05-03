import express from "express";
import {
  httpCreateUser,
  httpFindUserByEmail,
  httpGetUserById,
  httpGetAllUsers,
  httpUpdateUser,
} from "./user.controller.js";

const userRouter = express.Router();

userRouter.get("/", httpGetAllUsers);
userRouter.post("/", httpCreateUser);
userRouter.get("/:email", httpFindUserByEmail);
userRouter.get("/:id", httpGetUserById);
userRouter.put("/:id", httpUpdateUser);

export default userRouter;
