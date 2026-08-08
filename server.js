const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

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
    try {
        const filePath = path.join(__dirname, "data", "landing.json");
        const data = fs.readFileSync(filePath, "utf8");
        const landingData = JSON.parse(data);

        res.json(landingData);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to load landing page data"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});