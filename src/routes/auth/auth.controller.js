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
    res.status(201).send("http://localhost:3000/login");
  } catch (error) {
    res.statusMessage = "Error logging out";
    res.status(401).send(error.message);
  }
};

export { httpLogin, httpLogout };
