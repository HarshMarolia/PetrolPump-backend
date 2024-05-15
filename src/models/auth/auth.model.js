import bcrypt from "bcrypt";
import User from "../user/user.schema.js";

const authenticateUser = async ({ phone_number, password }) => {
  try {
    const user = await User.findOne({ phone_number });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { authenticateUser };
