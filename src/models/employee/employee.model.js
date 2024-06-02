import Employee from "./employee.schema.js";

const getEmployees = async () => {
  try {
    const employees = await Employee.find().populate({
      path: "petrol_pumps",
      select: "name email city state -_id",
    });
    return employees;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getEmployeeById = async (id) => {
  try {
    const employee = await Employee.findOne({ aadhar_number: id }).populate({
      path: "petrol_pumps",
      select: "name email city state -_id",
    });
    return employee;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createEmployee = async (employeeData) => {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateEmployee = async (id, employee) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {
      new: true,
    });
    if (!updatedEmployee) {
      throw new Error("Employee not found");
    }
    return updatedEmployee;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteEmployee = async (id) => {
  const deletedEmployee = await Employee.findByIdAndDelete(id);
  return deletedEmployee;
};

export {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
