const express = require('express');
const { getInvitations, getAllies, addAlly } = require('../models/Alliance');
const { searchPlayerByLogin } = require('../models/Player');

const router = express.Router();

router.get('/allies/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    const alliesList = await getAllies(playerId);
    res.json(alliesList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/invitations/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    const invitations = await getInvitations(playerId);
    res.json(invitations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id', async (req, res) => {
  const playerId = req.params.id;
  const { allyToBeAdded } = req.body;

  const player = await searchPlayerByLogin(allyToBeAdded);
  try {
    const resultToBeAdded = await addAlly(playerId, player.player_id);
    res.json(resultToBeAdded);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
