import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../models/employee/employee.model.js";

const httpGetEmployees = async (req, res) => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error getting employees", details: error });
  }
};

const httpGetEmployeeById = async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Error getting employee", details: error });
  }
};

const httpCreateEmployee = async (req, res) => {
  try {
    const employee = await createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Error creating employee",
      details: error.details || null,
    });
  }
};

const httpUpdateEmployee = async (req, res) => {
  try {
    const employee = await updateEmployee(req.params.id, req.body);
    res.status(200).json(employee);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Error updating employee",
      details: error.details || null,
    });
  }
};

const httpDeleteEmployee = async (req, res) => {
  try {
    const employee = await deleteEmployee(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      error: error.message || "Error deleting employee",
      details: error.details || null,
    });
  }
};

export {
  httpGetEmployees,
  httpGetEmployeeById,
  httpCreateEmployee,
  httpUpdateEmployee,
  httpDeleteEmployee,
};
