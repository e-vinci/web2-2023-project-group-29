const bcrypt = require('bcrypt');
const client = require('../db_config');

async function getAllPlayers() {
  try {
    const result = await client.query('SELECT * FROM remember_or_die.players');
    return result.rows;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des joueurs : ${error.message}`);
  }
}

async function addPlayer(email, login, password, avatarPath, xp) {
  try {
    // Validation d'email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Format d\'email invalide');
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO remember_or_die.players (email, login, password, avatar_path, xp) VALUES ($1, $2, $3, $4, $5)';
    const values = [email, login, hashedPassword, avatarPath, xp];
    await client.query(query, values);

    return { success: true, message: 'Joueur ajouté avec succès' };
  } catch (error) {
    throw new Error(`Erreur lors de l'ajout du joueur : ${error.message}`);
  }
}

module.exports = { getAllPlayers, addPlayer };
