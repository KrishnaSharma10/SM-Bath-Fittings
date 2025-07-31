require('dotenv').config();
const express = require("express");
const connectDb = require("./config/dbConnection");
const app = express();
const port = 5000;

app.use(express.json());
connectDb();

const collectionRoutes = require('./routes/collectionRoutes');
app.use('/api/categories', collectionRoutes);

app.get("/health", (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`SM server running on port ${port}`);
});