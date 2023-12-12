const client = require('../db_config');

async function getAllLevels() {
  try {
    const stmt = await client.query('SELECT level_id, name, memorisation_time, boss, card_number, world, level_number FROM remember_or_die.levels_vw');
    return stmt.rows;
  } catch (error) {
    throw new Error(`Error fetching levels: ${error.message}`);
  }
}

async function getLevelbyId(id) {
  try {
    const stmt = await client.query('SELECT level_id, name, memorisation_time, boss, card_number, world, level_number FROM remember_or_die.levels_vw WHERE level_id = $1', [id]);
    return stmt.rows[0];
  } catch (error) {
    throw new Error(`Error fetching level (id = ${id}): ${error.message}`);
  }
}

async function getLevel(world, level) {
  try {
    const stmt = await client.query('SELECT level_id FROM remember_or_die.levels_vw WHERE world = $1 AND level_number = $2;', [world, level]);
    return stmt.rows[0];
  } catch (error) {
    throw new Error(`Error fetching level (${world}-${level}): ${error.message}`);
  }
}

module.exports = { getAllLevels, getLevelbyId, getLevel };
