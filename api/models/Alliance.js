const client = require('../db_config');

async function getAllies(playerId) {
  try {
    const stmt = await client.query(
      "SELECT initiator_login AS login FROM remember_or_die.friends_vw WHERE receiver = $1 and state = 'accepted' "
        + 'UNION '
        + "SELECT receiver_login AS login FROM remember_or_die.friends_vw WHERE initiator = $1 and state = 'accepted';",
      [playerId],
    );
    return stmt.rows;
  } catch (error) {
    throw new Error(`Error fetching allies: ${error.message}`);
  }
}

async function getInvitations(playerId) {
  try {
    const stmt = await client.query(
      "SELECT initiator_login AS login FROM remember_or_die.friends_vw WHERE receiver = $1 and state = 'pending' "
        + 'UNION '
        + "SELECT receiver_login AS login FROM remember_or_die.friends_vw WHERE initiator = $1 and state = 'pending';",
      [playerId],
    );
    return stmt.rows;
  } catch (error) {
    throw new Error(`Error fetching invitations: ${error.message}`);
  }
}

async function addAlly(playerId, allyId) {
  try {
    const stmt = await client.query('SELECT remember_or_die.add_ally($1, $2);', [playerId, allyId]);
    return stmt.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeAlly(playerId, allyId) {
  try {
    const stmt = await client.query('SELECT remember_or_die.remove_ally($1, $2);', [
      playerId,
      allyId,
    ]);
    return stmt.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function acceptAlly(playerId, allyId) {
  try {
    const stmt = await client.query('SELECT remember_or_die.accept_ally($1, $2);', [
      playerId,
      allyId,
    ]);
    return stmt.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function rejectAlly(playerId, allyId) {
  try {
    const stmt = await client.query('SELECT remember_or_die.reject_ally($1, $2);', [
      playerId,
      allyId,
    ]);
    return stmt.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getInvitations,
  getAllies,
  addAlly,
  removeAlly,
  acceptAlly,
  rejectAlly,
};
