const express = require('express');

const router = express.Router();
const Player = require('../models/players');

// Récupérer tous les joueurs
router.get('/players', async (req, res) => {
  try {
    const players = await Player.getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer un nouveau joueur
router.post('/players', async (req, res) => {
  const {
    email, login, password, avatarPath, xp,
  } = req.body;

  if (!email || !login || !password || !avatarPath || xp === undefined) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const result = await Player.addPlayer(email, login, password, avatarPath, xp);
    return res.status(201).json(result); // Création réussie
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Ajoutez d'autres endpoints (mise à jour, suppression, etc.) au besoin

module.exports = router;
