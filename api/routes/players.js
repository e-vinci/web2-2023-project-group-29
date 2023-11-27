const express = require('express');

const router = express.Router();
const Player = require('../models/players');

/**
 * Récupère tous les joueurs.
 * @returns {JSON} - Un tableau JSON représentant les joueurs.
 * @throws {JSON} - Une réponse JSON d'erreur en cas d'échec.
 */
router.get('/players', async (req, res) => {
  try {
    const players = await Player.getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Crée un nouveau joueur.
 * @param {string} email - L'adresse e-mail du joueur.
 * @param {string} login - Le nom d'utilisateur du joueur.
 * @param {string} password - Le mot de passe du joueur.
 * @param {string} confirmPassword - La confirmation du mot de passe du joueur.
 * @param {string} avatarPath - Le chemin de l'avatar du joueur.
 * @param {number} xp - L'expérience du joueur.
 * @returns {JSON} - Une réponse JSON indiquant le succès de la création.
 * @throws {JSON} - Une réponse JSON d'erreur en cas d'échec.
 */
router.post('/players', async (req, res) => {
  const {
    email, login, password, confirmPassword, avatarPath, xp,
  } = req.body;

  if (!email || !login || !password || !confirmPassword || !avatarPath || xp === undefined) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const result = await Player.addPlayer(email, login, password, confirmPassword, avatarPath, xp);
    return res.status(201).json(result); // Création réussie
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Ajoutez d'autres endpoints (mise à jour, suppression, etc.) au besoin

module.exports = router;
