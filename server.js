const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const STATIC_PASSWORD = "phanthom@122";

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (username && password === STATIC_PASSWORD) {
        return res.json({
            success: true,
            user: {
                name: username,
                balance: 150000
            }
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid password"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Banking portal running on port ${PORT}`);
});