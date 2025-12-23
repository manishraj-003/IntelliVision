import jwt from "jsonwebtoken";

/**
 * JWT utility service
 */
const jwtService = {
  sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  },

  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};

export default jwtService;
