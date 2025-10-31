import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields required" });

  // Check if user exists
  const checkUser = "SELECT * FROM users WHERE email = ?";
  db.query(checkUser, [email], async (err, result) => {
    if (err) return res.status(500).json({ msg: err });

    if (result.length > 0)
      return res.status(400).json({ msg: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUser = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(insertUser, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ msg: err });

      return res.status(201).json({ msg: "Registered successfully" });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "All fields required" });

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) return res.status(500).json({ msg: err });

    if (result.length === 0)
      return res.status(400).json({ msg: "Invalid credentials" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    // Create JWT
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      msg: "Login successful",
      token,
      user: { id: user.user_id, name: user.name, role: user.role }
    });
  });
};
