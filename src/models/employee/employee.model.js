import Employee from "./employee.schema";

const getEmployees = async () => {
  const employees = await Employee.find();
  return employees;
};

const getEmployeeById = async (id) => {
  const employee = await Employee.findById(id);
  return employee;
};

const createEmployee = async (employeeData) => {
  const { aadhar_number, name, userId } = employeeData;

  let employee = await Employee.findOne({ aadhar_number });

  if (employee) {
    if (employee.petrol_pumps.includes(userId)) {
      return employee;
    }

    employee.petrol_pumps.push(userId);
    employee = await employee.save();
  } else {
    employee = await Employee.create({
      aadhar_number,
      name,
      petrol_pumps: [userId],
    });
  }

  return employee;
};

const updateEmployee = async (id, employee) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {
    new: true,
  });
  return updatedEmployee;
};

const deleteEmployee = async (id) => {
  const deletedEmployee = await Employee.findByIdAndDelete(id);
  return deletedEmployee;
};

export default {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
