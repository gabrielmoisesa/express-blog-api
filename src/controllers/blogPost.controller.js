const { blogPostService } = require('../services');
const { httpMap } = require('../utils');

const post = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  const { status, data } = await blogPostService.create(title, content, userId, categoryIds);
  res.status(httpMap(status)).json(data);
};

module.exports = {
  post,
};