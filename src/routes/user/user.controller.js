import {
  createUser,
  findUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
} from "../../models/user/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, FRONTEND_URL } from "../../config/cookies.js";
import { sendWelcomeEmail } from "../../config/nodemailer.js";

const httpCreateUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    // Generate a short-lived reset token for initial password setup
    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "15m",
    });
    const link = `${FRONTEND_URL}/reset-password/${user._id}/${token}`;

    // Background send to avoid request timeout; don't fail user creation on email issues
    sendWelcomeEmail(user.email, link)
      .then(() => console.log("Welcome email queued/sent"))
      .catch((e) => console.log("Welcome email failed", e));

    res.status(201).json({ user, message: "Welcome email has been queued to send" });
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
