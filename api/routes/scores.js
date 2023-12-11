const express = require('express');
const { getLastLevel, getBestScoresByWorldId, getFriendsBestScores } = require('../models/Score');
const { getAllies } = require('../models/Alliance');

const router = express.Router();

router.get('/lastLevel/:id', async (req, res) => {
  const playerId = req.params.id;

  try {
    const level = await getLastLevel(playerId);
    if (level.length === 0) {
      return res.status(404).json({ error: `Last level of ID ${playerId} not found.` });
    }
    return res.json(level);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/bestScores/:id', async (req, res) => {
  const worldId = req.params.id;

  try {
    const bestScores = await getBestScoresByWorldId(worldId);
    return res.json(bestScores);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get('/friendsBestScores/:id/:worldId', async (req, res) => {
  const { worldId } = req.params;
  const playerId = req.params.id;

  try {
    const bestScores = await getFriendsBestScores(playerId, worldId);
    return res.json(bestScores);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
