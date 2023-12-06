const { Category } = require('../models');
const { handle, schemas } = require('./common');

const getAll = async () => {
  const categories = await Category.findAll();
  return handle.getData(categories);
};

const create = async (name) => {
  const { error } = schemas.categoryName.validate(name);
  if (error) return handle.error(error);
  const category = await Category.create({ name });
  return handle.create(category);
};

module.exports = {
  getAll,
  create,
};