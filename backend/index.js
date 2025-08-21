require('dotenv').config();
const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());
connectDb();

const catalogRoutes = require('./routes/catalogRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/catalog', catalogRoutes);
app.use('/api/admin', adminRoutes);

app.get("/health", (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`SM server running on port ${port}`);
});