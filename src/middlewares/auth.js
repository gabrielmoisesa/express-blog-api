const { secret, jwt } = require('../utils');
const { BlogPost } = require('../models');

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

const userIdFromToken = (req, _res, next) => {
  const bearerToken = req.header('Authorization');
  const token = extractToken(bearerToken);
  const decoded = jwt.verify(token, secret);
  req.userId = decoded.payload.id;
  next();
};

const postAuthor = async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  const foundPost = await BlogPost.findOne({ where: { id } });
  if (!foundPost) return res.status(404).json({ message: 'Post does not exist' });
  if (foundPost.userId !== userId) return res.status(401).json({ message: 'Unauthorized user' });
  next();
};

module.exports = {
  validateJWT,
  userIdFromToken,
  postAuthor,
};