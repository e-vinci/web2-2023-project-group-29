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
    return res.json(alliesList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/invitations/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    const invitations = await getInvitations(playerId);
    return res.json(invitations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/:id', async (req, res) => {
  const playerId = req.params.id;
  const { allyToBeAdded } = req.body;

  let ally = null;

  try {
    ally = await searchPlayerByLogin(allyToBeAdded);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  if (ally === undefined || ally === null) {
    return res.status(404).json({ error: `Joueur \`${allyToBeAdded}´ introuvable.` });
  }

  // eslint-disable-next-line eqeqeq
  if (playerId == ally.player_id) {
    return res.status(500).json({
      error: "Ah ! Tenter de t'ajouter en tant qu'allié ? D'accord Narcisse, tu t'es déjà !",
    });
  }

  try {
    const response = await addAlly(playerId, ally.player_id);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:id/:ally', async (req, res) => {
  const playerId = req.params.id;
  const allyToBeRemoved = req.params.ally;

  let ally = null;

  try {
    ally = await searchPlayerByLogin(allyToBeRemoved);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  try {
    const resultToBeRemoved = await removeAlly(playerId, ally.player_id);
    return res.json(resultToBeRemoved);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
  }

  if (action === 'accept') {
    try {
      const response = await acceptAlly(playerId, ally.player_id);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (action === 'reject') {
    try {
      const response = await rejectAlly(playerId, ally.player_id);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: 'Action invalide.' });
  }
});

module.exports = router;
