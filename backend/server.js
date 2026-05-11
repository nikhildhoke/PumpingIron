const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");

// Connect to database  
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("PumpingIron API is running...")
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
});
