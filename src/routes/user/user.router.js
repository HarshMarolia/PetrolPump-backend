import express from "express";
import {
  httpCreateUser,
  httpFindUserByEmail,
  httpGetUserById,
  httpGetAllUsers,
  httpUpdateUser,
} from "./user.controller.js";
import { isAdminAuthenticated } from "../../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.get("/", isAdminAuthenticated, httpGetAllUsers);
userRouter.post("/", isAdminAuthenticated, httpCreateUser);
userRouter.get("/:id", isAdminAuthenticated, httpGetUserById);
userRouter.get("/email/:email", isAdminAuthenticated, httpFindUserByEmail);
userRouter.put("/:id", isAdminAuthenticated, httpUpdateUser);

export default userRouter;
