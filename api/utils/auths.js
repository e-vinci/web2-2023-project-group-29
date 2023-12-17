/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { readOneUserFromUsername } = require('../models/Player');

const jwtSecret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const token = req.get('authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token non fourni' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const {
      email, playerId, login, avatarPath, xp,
    } = decoded;

    const existingUser = await readOneUserFromUsername(email);

    if (!existingUser) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    req.user = {
      email,
      playerId,
      login,
      avatarPath,
      xp,
    };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};

const logout = (req, res) => {
  // Effacez le jeton en définissant un cookie expiré
  res.setHeader('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    maxAge: 0, // 0 rend le cookie expiré immédiatement
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Assurez-vous d'utiliser HTTPS en production
  }));

  const {
    email, playerId, login, avatarPath, xp,
  } = req.user;

  return res.status(200).json({
    message: 'Déconnexion réussie',
    disconnectedUser: {
      email,
      playerId,
      login,
      avatarPath,
      xp,
    },
  });
};

module.exports = { authenticate, logout };
