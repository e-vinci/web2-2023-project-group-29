const jwt = require('jsonwebtoken');
const { readOneUserFromUsername } = require('../models/players');

const jwtSecret = 'rememberOrDie';

const authenticate = async (req, res, next) => {
  const token = req.get('authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token non fourni' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { login } = decoded;

    const existingUser = await readOneUserFromUsername(login);

    if (!existingUser) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    req.user = existingUser;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};

module.exports = { authenticate };
