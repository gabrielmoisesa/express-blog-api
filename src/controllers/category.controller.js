const { categoryService } = require('../services');
const { httpMap } = require('../utils');

const get = async (_req, res) => {
  const { status, data } = await categoryService.getAll();
  res.status(httpMap(status)).json(data);
};

const post = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await categoryService.create(name); 
  res.status(httpMap(status)).json(data); 
};

module.exports = {
  get,
  post,
};