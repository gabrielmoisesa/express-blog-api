const { userService } = require('../services');
const httpMap = require('../utils/httpMap');

const get = async (req, res) => {
  const { status, data } = await userService.getAll();
  res.status(httpMap(status)).json(data);
};

const post = async (req, res) => {
  const { status, data } = await userService.create(req.body);
  res.status(httpMap(status)).json(data);
};

module.exports = {
  get,
  post,
};