import User from "./user.schema.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const createUser = async (user) => {
  try {
    const userData = await User.findOne({ phone_number: user.phone_number });
    if (userData) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const newUser = { ...user, password: hashedPassword };
    const createdUser = await User.create(newUser);
    return createdUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserByPhoneNumber = async (phone_number) => {
  try {
    const user = await User.findOne({ phone_number: phone_number });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select("-password -blacklisted -role");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update subscription and blacklist status will be done using this
const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePassword = async (id, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  createUser,
  findUserByPhoneNumber,
  getUserById,
  getAllUsers,
  updateUser,
  updatePassword,
};
