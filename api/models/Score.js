const client = require('../db_config');

async function getLastLevel(id) {
  try {
    const stmt = await client.query(
      `
      SELECT l.level_id, l.world, l.level_number 
      FROM remember_or_die.levels l 
      WHERE l.level_id = (SELECT MAX(level) 
                          FROM remember_or_die.scores s 
                          INNER JOIN remember_or_die.players p 
                                    ON p.player_id = s.player 
                          WHERE player_id = $1);
      `,
      [id],
    );
    return stmt.rows[0];
  } catch (error) {
    throw new Error(`Error fetching last played level: ${error.message}`);
  }
}

async function getBestScoresByWorldId(id) {
  try {
    const stmt = await client.query(
      'SELECT DISTINCT player, total_score FROM remember_or_die.best_scores_vw WHERE world = $1 AND total_score IS NOT NULL ORDER BY total_score;',
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
      SELECT p.login AS player, remember_or_die.sum_best_scores(p.player_id, l.world) AS total_score, l.world AS world
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
              AND l.world = $2
        GROUP BY p.player_id, p.login, l.world
        HAVING remember_or_die.sum_best_scores(p.player_id, l.world) IS NOT NULL
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

async function addScore(playerId, score, levelId) {
  try {
    const stmt = await client.query('SELECT remember_or_die.add_score($1, $2, $3);', [
      playerId,
      score,
      levelId,
    ]);
    return stmt.rows[0];
  } catch (error) {
    throw new Error(
      `Error adding score (${score}) for player (id = ${playerId}) for level (id = ${levelId}): ${error.message}`,
    );
  }
}

module.exports = {
  getLastLevel,
  getBestScoresByWorldId,
  getFriendsBestScores,
  addScore,
};
