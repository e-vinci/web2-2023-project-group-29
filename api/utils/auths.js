const jwt = require('jsonwebtoken');
const { readOneUserFromUsername } = require('../models/players');

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

module.exports = { authenticate };
