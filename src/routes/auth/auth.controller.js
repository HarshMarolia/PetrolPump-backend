import { authenticateUser } from "../../models/auth/auth.model.js";

const httpAuthenticateUser = async (req, res) => {
  try {
    const user = await authenticateUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error authenticating user", details: error.message });
  }
};

export { httpAuthenticateUser };
