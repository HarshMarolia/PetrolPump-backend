import {
  createUser,
  findUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
} from "../../models/user/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, FRONTEND_URL } from "../../config/cookies.js";
import { sendEmail } from "../../config/resend.js";

const generatePasswordResetLink = (user, expiry = "1d") => {
  const secret = JWT_SECRET + user.password;
  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: expiry,
  });
  return `${FRONTEND_URL}/reset-password/${user._id}/${token}`;
};

const httpCreateUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    
    if (!user.password) {
      return res.status(500).json({ 
        error: "Error creating user", 
        details: "User created but password was not set properly" 
      });
    }
    
    const link = generatePasswordResetLink(user, "1d");
    sendEmail(user.email, link, "welcome")
      .then(() => console.log("Welcome email sent"))
      .catch((e) => console.log("Welcome email failed", e));

    const userResponse = user.toObject ? user.toObject() : { ...user };
    delete userResponse.password;
    res.status(201).json({ user: userResponse, message: "User created successfully" });
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

// Admin-only: generate a password reset link (same logic as forgot-password)
// so the admin can copy/share it with the user manually.
const httpAdminGenerateResetLink = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const link = generatePasswordResetLink(user);

    return res.status(200).json({
      message: "Password reset link generated successfully",
      link,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error generating password reset link",
      details: error.message,
    });
  }
};

export {
  httpCreateUser,
  httpFindUserByEmail,
  httpGetUserById,
  httpGetAllUsers,
  httpUpdateUser,
  httpAdminGenerateResetLink,
};
