const client = require('../db_config');

async function getLastLevel(id) {
  try {
    const stmt = await client.query(
      'SELECT MAX(level) as lastLevel FROM remember_or_die.scores WHERE player = $1',
      [id],
    );
    return stmt.rows;
  } catch (error) {
    throw new Error(`Error fetching last played level: ${error.message}`);
  }
}

async function getBestScoresByWorldId(id) {
  try {
    const stmt = await client.query(
      'SELECT DISTINCT player, total_score FROM remember_or_die.best_scores_vw WHERE world = $1 ORDER BY total_score;',
      [id],
    );
    return stmt.rows;
  } catch (error) {
    throw new Error(`Error fetching best scores of world (id = ${id}): ${error.message}`);
  }
}

module.exports = { getLastLevel, getBestScoresByWorldId };
