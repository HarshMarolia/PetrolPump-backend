import { JWT_SECRET, FRONTEND_URL } from "../../config/cookies.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../config/resend.js";
import User from "../../models/user/user.schema.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const clientURL = FRONTEND_URL;

const httpLogin = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successful",
        user: req.user,
        cookies: req.cookies,
      });
    } else {
      throw Error();
    }
  } catch (error) {
    res.statusMessage = "Error logging in";
    res.status(401).send(error.message);
  }
};

const httpLogout = async (req, res) => {
  try {
    req.logout(() => {});
    res.status(201).send(`${clientURL}/login`);
  } catch (error) {
    res.statusMessage = "Error logging out";
    res.status(401).send(error.message);
  }
};

const httpForgotPassword = async (req, res) => {
  try {
    // Use findOne without select to get password field
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Ensure user has a password (should always be true, but safety check)
    if (!user.password) {
      return res.status(400).json({ message: "User account has no password set" });
    }
    
    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "1d",
    });
    const link = `${clientURL}/reset-password/${user._id}/${token}`;
    sendEmail(user.email, link, "passwordReset")
      .then(() => console.log("Password reset email queued/sent"))
      .catch((e) => console.log("Password reset email failed", e));
    res
      .status(200)
      .json({ message: "Password reset link has been queued to send" });
  } catch (error) {
    console.error("Error in httpForgotPassword:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
};

const httpUpdatePassword = async (req, res) => {
  const { id, token, password } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const secret = JWT_SECRET + user.password;
    try {
      const verify = jwt.verify(token, secret);
      if (verify) {
        try {
          const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
          const updatedUser = await User.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
          );
          if (!updatedUser) {
            return res.status(404).send("User not found");
          }
          res
            .status(200)
            .send({ message: "Password Updated", user: updatedUser });
        } catch (error) {
          return res.status(500).send("Error updating password");
        }
      } else {
        return res.status(401).send("Not Verified");
      }
    } catch (error) {
      return res.status(401).send("Not Verified");
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

export { httpLogin, httpLogout, httpForgotPassword, httpUpdatePassword };
