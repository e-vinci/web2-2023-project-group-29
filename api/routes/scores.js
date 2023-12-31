const express = require('express');
const {
  getLastLevel, getBestScoresByWorldId, getFriendsBestScores, addScore,
} = require('../models/Score');
const { searchPlayerById } = require('../models/Player');

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

router.post('/addScore', async (req, res) => {
  const { playerId } = req.body;
  const { score } = req.body;
  const { levelId } = req.body;

  try {
    const response = await addScore(playerId, score, levelId);
    if (response) {
      const player = await searchPlayerById(playerId);
      player.lastLevel = await getLastLevel(playerId);
      return res.json(player);
    }
    return res.json(null);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
