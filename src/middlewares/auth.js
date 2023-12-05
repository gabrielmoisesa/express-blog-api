const { secret, jwt } = require('../utils');

const extractToken = (bearerToken) => bearerToken.split(' ')[1];

const validateJWT = (req, res, next) => {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) return res.status(401).json({ message: 'Token not found' });

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded) return res.status(401).json({ message: 'Expired or invalid token' });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateJWT,
};