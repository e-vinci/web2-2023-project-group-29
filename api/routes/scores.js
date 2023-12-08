const express = require('express');
const { getLastLevel, getBestScoresByWorldId } = require('../models/Score');

const router = express.Router();

router.get('/lastLevel/:id', async (req, res) => {
  const playerId = req.params.id;

  try {
    const level = await getLastLevel(playerId);
    if (level.length === 0) {
      res.status(404).json({ error: `Level with ID ${playerId} not found.` });
    } else {
      res.json(level);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error occurred while fetching level (id = ${playerId}): ${error.message}` });
  }
});

router.get('/bestScores/:id', async (req, res) => {
  const worldId = req.params.id;

  try {
    const bestScores = await getBestScoresByWorldId(worldId);
    res.json(bestScores);
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while fetching best scores (world id = ${worldId}): ${error.message}`,
    });
  }
});

module.exports = router;
