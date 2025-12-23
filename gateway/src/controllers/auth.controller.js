import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwtService from "../services/jwt.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findByEmail(email);
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.createUser(name, email, hashed);

    const token = jwtService.generateToken(newUser);

    res.json({
      message: "Signup successful",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwtService.generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const profile = async (req, res) => {
  res.json({ user: req.user });
};

export default {
  signup,
  login,
  profile,
};
