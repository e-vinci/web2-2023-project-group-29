const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../db_config');

const jwtSecret = process.env.JWT_SECRET;
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

async function getAllPlayers() {
  try {
    const result = await client.query('SELECT * FROM remember_or_die.players');
    return result.rows;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des joueurs : ${error.message}`);
  }
}

async function loginPlayer(email, password) {
  try {
    const result = await client.query('SELECT * FROM remember_or_die.players WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return undefined;
    }

    const userFound = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return undefined;
    }

    const token = jwt.sign(
      {
        playerId: userFound.player_id,
        email: userFound.email,
        login: userFound.login,
        avatarPath: userFound.avatar_path,
        xp: userFound.xp,
      },
      jwtSecret,
      { expiresIn: lifetimeJwt },
    );

    const authenticatedUser = {
      playerId: userFound.player_id,
      email: userFound.email,
      login: userFound.login,
      avatarPath: userFound.avatar_path,
      xp: userFound.xp,
      token,
    };

    return authenticatedUser;
  } catch (error) {
    throw new Error(`Erreur lors de la connexion du joueur : ${error.message}`);
  }
}

async function addPlayer(email, login, password, avatarPath, xp) {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Format d'email invalide");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = 'INSERT INTO remember_or_die.players (email, login, password, avatar_path, xp) VALUES ($1, $2, $3, $4, $5)';
    const values = [email, login, hashedPassword, avatarPath, xp];
    await client.query(query, values);

    const token = jwt.sign(
      { email },
      jwtSecret,
      { expiresIn: lifetimeJwt },
    );

    const result = {
      success: true,
      message: 'Joueur ajouté avec succès',
      token,
    };

    return result;
  } catch (error) {
    throw new Error(`Erreur lors de l'ajout du joueur : ${error.message}`);
  }
}

async function readOneUserFromUsername(email) {
  try {
    const result = await client.query('SELECT * FROM remember_or_die.players WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de l'utilisateur par email : ${error.message}`);
  }
}

module.exports = {
  getAllPlayers, addPlayer, loginPlayer, readOneUserFromUsername, lifetimeJwt,
};
