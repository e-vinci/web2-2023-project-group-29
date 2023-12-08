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
    const stmt = await client.query('INSERT INTO remember_or_die.players (email, login, password, avatar_path, xp) VALUES ($1, $2, $3, $4, $5)');
    const values = [email, login, password, avatarPath, xp];
    await client.query(stmt, values);

    return { success: true, message: 'Player added successfully' };
  } catch (error) {
    throw new Error(`Error adding player: ${error.message}`);
  }
}

module.exports = { getAllPlayers, addPlayer };
