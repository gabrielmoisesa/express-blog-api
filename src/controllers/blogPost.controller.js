const { blogPostService } = require('../services');
const { httpMap } = require('../utils');

const get = async (req, res) => {
  const { status, data } = await blogPostService.getAll();
  res.status(httpMap(status)).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await blogPostService.getById(id);
  res.status(httpMap(status)).json(data);
};

const post = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  const { status, data } = await blogPostService.create(title, content, userId, categoryIds);
  res.status(httpMap(status)).json(data);
};

const put = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { userId } = req;
  const { status, data } = await blogPostService.update(title, content, id, userId);
  res.status(httpMap(status)).json(data);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await blogPostService.deleteById(id);
  res.status(httpMap(status)).json(data);
};

module.exports = {
  get,
  getById,
  post,
  put,
  deleteById,
};