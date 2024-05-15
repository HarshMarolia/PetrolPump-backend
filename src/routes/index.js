import { Router } from "express";
import userRouter from "./user/user.router.js";
import authRouter from "./auth/auth.router.js";
import clientRouter from "./client/client.router.js";
import employeeRouter from "./employee/employee.router.js";
import priceRouter from "./price/price.router.js";
import newsRouter from "./news/news.router.js";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/client", clientRouter);
router.use("/employee", employeeRouter);
router.use("/price", priceRouter);
router.use("/news", newsRouter);

export { router };
