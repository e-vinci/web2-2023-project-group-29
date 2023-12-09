/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cookie = require('cookie');
const Player = require('../models/players');
const { authenticate, logout } = require('../utils/auths');

const router = express.Router();
const { lifetimeJwt } = require('../models/players');

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

    const { token } = authenticatedUser;

    // Stocker le jeton dans un cookie HTTP
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: lifetimeJwt / 1000, // La durée de vie du cookie en secondes
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // Assurez-vous d'utiliser HTTPS en production
    }));

    return res.json(authenticatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/logout', authenticate, logout);

module.exports = router;
