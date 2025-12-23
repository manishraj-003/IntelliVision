/**
 * Role-based access control middleware
 * @param {string} role
 */
export default function role(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}
