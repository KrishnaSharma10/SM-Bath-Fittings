const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const safeEqual = (a, b) => {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
};

const login = async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const userOk = safeEqual(username, process.env.ADMIN_USERNAME);
    const passOk = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

    if (!userOk || !passOk) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "8h",
    });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { login };