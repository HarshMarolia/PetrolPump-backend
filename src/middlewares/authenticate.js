const requireRole =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    const userRole = req.user?.role;
    const isBlacklisted = req.user?.blacklisted;

    if (isBlacklisted) {
      if (typeof req.logout === "function") {
        req.logout(() => {});
      }
      return res.status(403).send("User is blacklisted");
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).send("Forbidden");
    }

    return next();
  };

const isAdminAuthenticated = requireRole("admin");
const isSuperUserAuthenticated = requireRole("admin", "superUser");
const isUserAuthenticated = requireRole("user", "superUser", "admin");

export {
  isAdminAuthenticated,
  isSuperUserAuthenticated,
  isUserAuthenticated,
  requireRole,
};
