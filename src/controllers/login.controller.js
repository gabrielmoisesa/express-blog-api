const jwt = require('jsonwebtoken');
const { loginService } = require('../services');
const httpMap = require('../utils/httpMap');

const secret = process.env.JWT_SECRET;

const post = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await loginService.getByEmail(email, password);
  if (status === 'BAD_REQUEST') return res.status(httpMap(status)).json({ message: data.message });

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const payload = {
    id: data.id,
    displayName: data.displayName,
    email: data.email,
    image: data.image,
  };

  const token = jwt.sign({ payload }, secret, jwtConfig);

  return res.status(httpMap(status)).json({ token });
};

module.exports = {
  post,
};