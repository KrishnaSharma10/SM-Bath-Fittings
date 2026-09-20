require('dotenv').config();
const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require('cors');
const helmet = require("helmet");
const app = express();
const port = process.env.PORT || 5000;

["ADMIN_USERNAME", "ADMIN_PASSWORD_HASH", "JWT_SECRET"].forEach((key) => {
  if (!process.env[key]) throw new Error(`Missing env variable: ${key}`);
});

app.use(cors());
app.use(helmet());

app.use(express.json());
connectDb();

const authRoutes = require("./routes/authRoutes");
const catalogRoutes = require('./routes/catalogRoutes');
app.use("/api/auth", authRoutes);
app.use('/api/catalog', catalogRoutes);

app.get("/health", (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`SM server running on port ${port}`);
});