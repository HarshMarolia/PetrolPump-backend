import express from "express";
import {
  httpCreateUser,
  httpFindUserByPhoneNumber,
  httpGetUserById,
  httpGetAllUsers,
  httpUpdateUser,
  httpUpdatePassword,
} from "./user.controller.js";

const userRouter = express.Router();

userRouter.get("/", httpGetAllUsers);
userRouter.post("/", httpCreateUser);
userRouter.get("/:id", httpGetUserById);
userRouter.get("/phone/:phone", httpFindUserByPhoneNumber);
userRouter.put("/:id", httpUpdateUser);
userRouter.patch("/password/:id", httpUpdatePassword);

export default userRouter;
