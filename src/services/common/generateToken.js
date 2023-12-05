const { secret, jwt } = require('../../utils');

const generateToken = (user) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const payload = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  };

  const token = jwt.sign({ payload }, secret, jwtConfig);

  return token;
};

module.exports = generateToken;