// Dans models/players.js

const bcrypt = require('bcrypt');
const client = require('../db_config');

/**
 * Récupère tous les joueurs depuis la base de données.
 * @returns {Promise<Array>} Un tableau d'objets représentant les joueurs.
 * @throws {Error} Une erreur si la récupération échoue.
 */
async function getAllPlayers() {
  try {
    const result = await client.query('SELECT * FROM remember_or_die.players');
    return result.rows;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des joueurs : ${error.message}`);
  }
}

/**
 * Ajoute un nouveau joueur à la base de données.
 * @param {string} email - L'adresse e-mail du joueur.
 * @param {string} login - Le nom d'utilisateur du joueur.
 * @param {string} password - Le mot de passe du joueur.
 * @param {string} confirmPassword - La confirmation du mot de passe du joueur.
 * @param {string} avatarPath - Le chemin de l'avatar du joueur.
 * @param {number} xp - L'expérience du joueur.
 * @returns {Promise<Object>} Un objet indiquant le succès de l'ajout.
 * @throws {Error} Une erreur si l'ajout échoue.
 */
async function addPlayer(email, login, password, confirmPassword, avatarPath, xp) {
  try {
    // Validation d'email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Format d'email invalide");
    }

    // Vérification du mot de passe et de sa confirmation
    if (password !== confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas');
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

/**
 * Déconnecte un joueur de l'application.
 * @param {string} playerId - L'ID du joueur à déconnecter.
 * @returns {Promise<Object>} Un objet indiquant le succès de la déconnexion.
 * @throws {Error} Une erreur si la déconnexion échoue.
 */
async function logoutPlayer(playerId) {
  try {
    const query = 'UPDATE remember_or_die.players SET connected = false WHERE id = $1';
    const values = [playerId];
    await client.query(query, values);

    return { success: true, message: 'Joueur déconnecté avec succès' };
  } catch (error) {
    throw new Error(`Erreur lors de la déconnexion du joueur : ${error.message}`);
  }
}

module.exports = { getAllPlayers, addPlayer, logoutPlayer };
