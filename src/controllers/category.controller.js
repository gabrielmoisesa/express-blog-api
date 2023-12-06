const { categoryService } = require('../services');
const { httpMap } = require('../utils');

const post = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await categoryService.create(name); 
  res.status(httpMap(status)).json(data); 
};

module.exports = {
  post,
};