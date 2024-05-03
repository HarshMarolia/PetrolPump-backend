import User from "./user.schema.js";

const createUser = async (user) => {
  try {
    const createdUser = await User.create(user);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const updateUser = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
};

export { createUser, findUserByEmail, getUserById, getAllUsers, updateUser };
