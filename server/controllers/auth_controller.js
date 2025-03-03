import { db } from "../server.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { transporter }  from "./customer_controller.js";
import { subscribe } from "diagnostics_channel";


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

    const [result] = await db.execute(
      "INSERT INTO users (name, contact, email, role, password) VALUES (?, ?, ?, ?, ?)",
      [name, contact, email, "customer", hashedPassword]
    );
    await sendVerificationEmail(result.insertId, email);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Error processing request", error });
  }
};

export const sendVerificationEmail = async (user_id, email) => {
  const token = crypto.randomBytes(32).toString("hex");
  const verificationLink = `http://localhost:5000/auth/verifyEmail?token=${token}`;
  await db.execute("UPDATE users SET email_token = ? WHERE user_id = ?", [token, user_id]);

  await transporter.sendMail({
    from: "mushahidmuzammir11339gmail.com",
    to: email,
    subject: "Email Verification",
    html: `Click <a href="${verificationLink}">here</a> to verify your email`,
  });
}

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try{
    const [rows] = await db.execute("SELECT * FROM users WHERE email_token = ?", [token]);
    if(rows.length === 0) {
      return res.status(404).send(`<h2 style="color : red, text-align: center">Invalid or expired token</h2>`);
    }
    res.status(200).send(
      `<h2 style="color : green, text-align: center">Email verified successfully</h2>
      <p style="text-align: center;">Redirecting to login page...</p>
      <script>
        setTimeout(() => {
          window.location.href = "http://localhost:4200/login"; // Adjust frontend URL
        }, 3000);
      </script>`
    );
  }catch{
    res.status(500).send(`<h2 style="color: red; text-align: center;">Error processing request</h2>`); 
  }
}

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
