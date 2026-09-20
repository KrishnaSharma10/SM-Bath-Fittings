const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Not authorised" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "admin") throw new Error("Wrong role");
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ message: "Session expired. Please log in again." });
  }
};