const express = require('express');
const {
  getInvitations, getAllies, addAlly, removeAlly,
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

  const player = await searchPlayerByLogin(allyToBeAdded);

  // eslint-disable-next-line eqeqeq
  if (playerId == player.player_id) {
    res.status(500).json({ error: "Ah ! Tenter de t'ajouter en tant qu'allié ? D'accord Narcisse, tu t'es déjà !" });
  } else {
    try {
      const resultToBeAdded = await addAlly(playerId, player.player_id);
      res.json(resultToBeAdded);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete('/:id', async (req, res) => {
  const playerId = req.params.id;
  const { allyToBeRemoved } = req.body;

  const player = await searchPlayerByLogin(allyToBeRemoved);

  try {
    const resultToBeRemoved = await removeAlly(playerId, player.player_id);
    res.json(resultToBeRemoved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
