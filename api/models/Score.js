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

async function getFriendsBestScores(playerId, worldId) {
  try {
    const stmt = await client.query(
      `
      SELECT p.login AS player, COALESCE(remember_or_die.sum_best_scores(p.player_id, l.world), 0) AS total_score, l.world AS world
      FROM remember_or_die.players p
         LEFT JOIN remember_or_die.scores s ON p.player_id = s.player
         LEFT JOIN remember_or_die.levels l ON l.level_id = s.level
      WHERE (p.player_id IN (SELECT initiator
                            FROM remember_or_die.alliances
                            WHERE receiver = $1
                            AND state = 'accepted'
                            UNION
                            SELECT receiver
                            FROM remember_or_die.alliances
                            WHERE initiator = $1
                            AND state = 'accepted') 
            OR p.player_id = $1)
            AND world = $2
      GROUP BY p.player_id, p.login, l.world
      ORDER BY total_score;
      `,
      [playerId, worldId],
    );
    return stmt.rows;
  } catch (error) {
    throw new Error(
      `Error fetching best scores for player (id = ${playerId}) of world (id = ${worldId}): ${error.message}`,
    );
  }
}

module.exports = { getLastLevel, getBestScoresByWorldId, getFriendsBestScores };
