const express = require('express');
const { getAllLevels, getLevelbyId, getLevel } = require('../models/Level');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allLevels = await getAllLevels();
    return res.json(allLevels);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const levelId = req.params.id;

  try {
    const level = await getLevelbyId(levelId);
    if (level === undefined || level === null) {
      return res.status(404).json({ error: `Level with ID ${levelId} not found.` });
    }
    return res.json(level);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:world/:level', async (req, res) => {
  const { world } = req.params;
  const { level } = req.params;

  try {
    const response = await getLevel(parseInt(world, 10), parseInt(level, 10));
    if (response === undefined || response === null) {
      return res.status(404).json({ error: `Level ${world}-${level} not found.` });
    }
    const levelId = response.level_id;
    return res.json(levelId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
