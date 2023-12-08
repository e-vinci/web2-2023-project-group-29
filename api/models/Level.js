const client = require('../db_config');

async function getAllLevels() {
  try {
    const stmt = await client.query('SELECT * FROM remember_or_die.levels');
    return stmt.rows;
  } catch (error) {
    throw new Error(`Error fetching levels: ${error.message}`);
  }
}

async function getLevelbyId(id) {
  try {
    const stmt = await client.query('SELECT * FROM remember_or_die.levels WHERE level_id = $1', [id]);
    return stmt.rows;
  } catch (error) {
    throw new Error(`Error fetching level (id = ${id}): ${error.message}`);
  }
}

module.exports = { getAllLevels, getLevelbyId };
