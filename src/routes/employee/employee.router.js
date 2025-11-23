import express from "express";

import {
  httpGetEmployees,
  httpGetEmployeeById,
  httpCreateEmployee,
  httpUpdateEmployee,
  httpDeleteEmployee,
} from "./employee.controller.js";
import { isUserAuthenticated } from "../../middlewares/authenticate.js";

const employeeRouter = express.Router();

employeeRouter.get("/", isUserAuthenticated, httpGetEmployees);
employeeRouter.post("/", isUserAuthenticated, httpCreateEmployee);
employeeRouter.get("/:id", isUserAuthenticated, httpGetEmployeeById);
employeeRouter.put("/:id", isUserAuthenticated, httpUpdateEmployee);
employeeRouter.delete("/:id", isUserAuthenticated, httpDeleteEmployee);

export default employeeRouter;
