const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "ABTalks backend is running"
    });
});

// Landing page API
app.get("/api/landing", (req, res) => {
    const data = fs.readFileSync("./data/landing.json", "utf8");
    const landingData = JSON.parse(data);

    res.json(landingData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});