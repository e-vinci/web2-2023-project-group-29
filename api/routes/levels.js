const express = require('express');
const { getAllLevels, getLevelbyId } = require('../models/Level');

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
    if (level.length === 0) {
      return res.status(404).json({ error: `Level with ID ${levelId} not found.` });
    }
    return res.json(level);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
