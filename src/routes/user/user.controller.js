import {
  createUser,
  findUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
} from "../../models/user/user.model.js";

const httpCreateUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating user", details: error.message });
  }
};

const httpFindUserByEmail = async (req, res) => {
  try {
    const user = await findUserByEmail(req.params.email);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error finding user", details: error.message });
  }
};

const httpGetUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting user", details: error.message });
  }
};

const httpGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting users", details: error.message });
  }
};

const httpUpdateUser = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating user", details: error.message });
  }
};

export {
  httpCreateUser,
  httpFindUserByEmail,
  httpGetUserById,
  httpGetAllUsers,
  httpUpdateUser,
};
