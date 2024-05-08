import User from "./user.schema.js";

const createUser = async (user) => {
  try {
    const createdUser = await User.create(user);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const findUserByPhoneNumber = async (phone_number) => {
  const user = await User.findOne({ phone_number });
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

const updateSubscription = async (id, subscriptionDate) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscription_expiry: subscriptionDate },
    { new: true }
  );
  return updatedUser;
};

const blackListUser = async (id) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { blacklisted: true },
    { new: true }
  );
  return updatedUser;
};

const updatePassword = async (id, password) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { password: password },
    { new: true }
  );
  return updatedUser;
};

export {
  createUser,
  findUserByPhoneNumber,
  getUserById,
  getAllUsers,
  updateUser,
  updateSubscription,
  blackListUser,
  updatePassword,
};
