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
    res
      .status(500)
      .json({ error: "Error creating employee", details: error.message });
  }
};

const httpUpdateEmployee = async (req, res) => {
  try {
    const employee = await updateEmployee(req.params.id, req.body);
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating employee", details: error.message });
  }
};

const httpDeleteEmployee = async (req, res) => {
  try {
    const employee = await deleteEmployee(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting employee", details: error.message });
  }
};

export {
  httpGetEmployees,
  httpGetEmployeeById,
  httpCreateEmployee,
  httpUpdateEmployee,
  httpDeleteEmployee,
};
