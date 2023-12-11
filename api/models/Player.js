const client = require('../db_config');

async function getAllPlayers() {
  try {
    const stmt = await client.query('SELECT * FROM remember_or_die.players');
    return stmt.rows;
  } catch (error) {
    throw new Error(`Error fetching players: ${error.message}`);
  }
}

async function addPlayer(email, login, password, avatarPath, xp) {
  try {
    const stmt = await client.query(
      'INSERT INTO remember_or_die.players (email, login, password, avatar_path, xp) VALUES ($1, $2, $3, $4, $5)',
    );
    const values = [email, login, password, avatarPath, xp];
    await client.query(stmt, values);

    return { success: true, message: 'Player added successfully' };
  } catch (error) {
    throw new Error(`Error adding player: ${error.message}`);
  }
}

async function searchPlayerByLogin(login) {
  try {
    const stmt = await client.query(
      'SELECT player_id, email, login, avatar_path, xp FROM remember_or_die.players_vw WHERE login = $1',
      [login],
    );
    return stmt.rows[0];
  } catch (error) {
    throw new Error(`Error fetching player (login = ${login}): ${error.message}`);
  }
}

module.exports = { getAllPlayers, addPlayer, searchPlayerByLogin };
