const express = require('express');
const { getAllLevels, getLevelbyId, getLevel } = require('../models/Level');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allLevels = await getAllLevels();
    res.json(allLevels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/id=?:id', async (req, res) => {
  const levelId = req.params.id;

  try {
    const level = await getLevelbyId(levelId);
    if (level === undefined || level === null) {
      res.status(404).json({ error: `Level with ID ${levelId} not found.` });
    } else {
      res.json(level);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/world=?:world/level=?:level', async (req, res) => {
  const { world } = req.params;
  const { level } = req.params;

  try {
    const response = await getLevel(parseInt(world, 10), parseInt(level, 10));
    if (response === undefined || response === null) {
      res.status(404).json({ error: `Level ${world}-${level} not found.` });
    } else {
      const levelId = response.level_id;
      res.json(levelId);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
