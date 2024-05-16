import express from "express";
import {
  httpCreateUser,
  httpFindUserByPhoneNumber,
  httpGetUserById,
  httpGetAllUsers,
  httpUpdateUser,
  httpUpdatePassword,
} from "./user.controller.js";
import { isAdminAuthenticated } from "../../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.get("/", isAdminAuthenticated, httpGetAllUsers);
userRouter.post("/", isAdminAuthenticated, httpCreateUser);
userRouter.get("/:id", isAdminAuthenticated, httpGetUserById);
userRouter.get(
  "/phone/:phone",
  isAdminAuthenticated,
  httpFindUserByPhoneNumber
);
userRouter.put("/:id", isAdminAuthenticated, httpUpdateUser);
userRouter.patch("/password/:id", isAdminAuthenticated, httpUpdatePassword);

export default userRouter;
