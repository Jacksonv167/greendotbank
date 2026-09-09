const express = require("express");
const path = require("path");

const app = express();

// Allow JSON requests
app.use(express.json());

// Serve the frontend
app.use(express.static(path.join(__dirname, "public")));

// Demo login endpoint
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    // DEMO credentials only
    if (username === "demo" && password === "demo123") {
        return res.json({
            success: true,
            message: "Login successful",
            user: {
                name: "Demo User",
                balance: 150000.00
            }
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid demo username or password"
    });
});

// Example account endpoint
app.get("/api/account", (req, res) => {
    res.json({
        name: "Demo User",
        accountType: "Demo Deposit Account",
        balance: 150000.00
    });
});

// Example transaction endpoint
app.get("/api/transactions", (req, res) => {
    res.json([
        {
            description: "Demo Deposit",
            amount: 5000,
            date: "2026-09-08"
        },
        {
            description: "Demo Payment",
            amount: -1200,
            date: "2026-09-06"
        },
        {
            description: "Demo Transfer",
            amount: -750,
            date: "2026-09-04"
        }
    ]);
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bank demo running on port ${PORT}`);
});