const client = require('../db_config');

async function getAllLevels() {
  try {
    const result = await client.query('SELECT * FROM remember_or_die.levels');
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching levels: ${error.message}`);
  }
}

async function getLevelbyId(id) {
  try {
    const result = await client.query('SELECT * FROM remember_or_die.levels WHERE level_id = $1', [id]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching level (id = ${id}): ${error.message}`);
  }
}

module.exports = { getAllLevels, getLevelbyId };
