import express from "express";

import {
  httpGetEmployees,
  httpGetEmployeeById,
  httpCreateEmployee,
  httpUpdateEmployee,
  httpDeleteEmployee,
} from "./employee.controller.js";

const employeeRouter = express.Router();

employeeRouter.get("/", httpGetEmployees);
employeeRouter.get("/:id", httpGetEmployeeById);
employeeRouter.post("/", httpCreateEmployee);
employeeRouter.put("/:id", httpUpdateEmployee);
employeeRouter.delete("/:id", httpDeleteEmployee);

export default employeeRouter;
