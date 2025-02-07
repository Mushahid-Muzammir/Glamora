import { db } from "../server.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    console.log(user);
    const pwMatch = await bcrypt.compare(password, user.password);

    if (!pwMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const register = async (req, res) => {
  console.log("Reached Backend:", req.body);
  const { name, contact, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, contact, email, password) VALUES (?, ?, ?, ?)",
      [name, contact, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Error processing request", error });
  }
};

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "JWT access denied" });
  }

  jwt.verify(token, SECRET_KEY, (err, result) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    req.user = result;
    next();
  });
};
