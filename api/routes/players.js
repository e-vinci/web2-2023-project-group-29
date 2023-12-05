const express = require('express');
const Player = require('../models/players');
const { authenticate } = require('../utils/auths');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const players = await Player.getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  const {
    email, login, password, avatarPath, xp,
  } = req.body;

  if (!email || !login || !password || !avatarPath || xp === undefined) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const result = await Player.addPlayer(email, login, password, avatarPath, xp);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis' });
  }

  try {
    const authenticatedUser = await Player.loginPlayer(email, password);

    if (!authenticatedUser) {
      return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    return res.json(authenticatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
