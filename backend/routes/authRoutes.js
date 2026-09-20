const express = require("express");
const rateLimit = require("express-rate-limit");
const { login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 attempts per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again in a few minutes." },
});

router.post("/login", loginLimiter, login);
router.get("/verify", authMiddleware, (req, res) => res.json({ ok: true }));

module.exports = router;