import express from "express";

import {
  httpGetEmployees,
  httpGetEmployeeById,
  httpCreateEmployee,
  httpUpdateEmployee,
  httpDeleteEmployee,
} from "./employee.controller.js";
import { isAdminAuthenticated } from "../../middlewares/authenticate.js";

const employeeRouter = express.Router();

employeeRouter.get("/", isAdminAuthenticated, httpGetEmployees);
employeeRouter.get("/:id", isAdminAuthenticated, httpGetEmployeeById);
employeeRouter.post("/", isAdminAuthenticated, httpCreateEmployee);
employeeRouter.put("/:id", isAdminAuthenticated, httpUpdateEmployee);
employeeRouter.delete("/:id", isAdminAuthenticated, httpDeleteEmployee);

export default employeeRouter;
