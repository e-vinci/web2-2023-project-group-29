const jwt = require('jsonwebtoken');
const { readOneUserFromUsername } = require('../models/players');

const jwtSecret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const token = req.get('authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token non fourni' });
  }

  try {
    console.log('before');
    const decoded = jwt.verify(token, jwtSecret);
    const { email } = decoded;
    console.log('after');
    console.log(decoded);

    const existingUser = await readOneUserFromUsername(email);

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
