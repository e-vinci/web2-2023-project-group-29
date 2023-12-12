const express = require('express');
const { getAllLevels, getLevelbyId } = require('../models/Level');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allLevels = await getAllLevels();
    res.json(allLevels);
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while fetching all levels.' });
  }
});

router.get('/:id', async (req, res) => {
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

module.exports = router;
