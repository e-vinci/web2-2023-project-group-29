const express = require('express');
const {
  getInvitations,
  getAllies,
  addAlly,
  removeAlly,
  acceptAlly,
  rejectAlly,
} = require('../models/Alliance');
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

  let ally = null;

  try {
    ally = await searchPlayerByLogin(allyToBeAdded);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  if (ally === undefined || ally === null) {
    res.status(404).json(`Player ${allyToBeAdded} not found.`);
  }

  // eslint-disable-next-line eqeqeq
  if (playerId == ally.player_id) {
    res.status(500).json({
      error: "Ah ! Tenter de t'ajouter en tant qu'allié ? D'accord Narcisse, tu t'es déjà !",
    });
  }

  try {
    const response = await addAlly(playerId, ally.player_id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id/:ally', async (req, res) => {
  const playerId = req.params.id;
  const allyToBeRemoved = req.params.ally;

  const ally = await searchPlayerByLogin(allyToBeRemoved);

  try {
    const resultToBeRemoved = await removeAlly(playerId, ally.player_id);
    res.json(resultToBeRemoved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/:sender', async (req, res) => {
  const playerId = req.params.id;
  const { sender } = req.params;
  const { action } = req.query;

  let ally = null;

  try {
    ally = await searchPlayerByLogin(sender);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  if (action === 'accept') {
    try {
      const response = await acceptAlly(playerId, ally.player_id);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (action === 'reject') {
    try {
      const response = await rejectAlly(playerId, ally.player_id);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Action invalide.' });
  }
});

module.exports = router;
