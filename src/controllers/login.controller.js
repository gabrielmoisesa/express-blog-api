const { loginService } = require('../services');
const httpMap = require('../utils/httpMap');

const post = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await loginService.authWithToken(email, password);
  res.status(httpMap(status)).json(data);
};

module.exports = {
  post,
};