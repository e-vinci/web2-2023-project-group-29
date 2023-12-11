const express = require('express');
const { getAllPlayers, addPlayer } = require('../models/Player');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allPlayers = await getAllPlayers();
    res.json(allPlayers);
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while fetching all players.' });
  }
});

router.post('/', async (req, res) => {
  const {
    email, login, password, avatarPath, xp,
  } = req.body;

  try {
    const result = await addPlayer(email, login, password, avatarPath, xp);

    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while adding a player.' });
  }
});

module.exports = router;
