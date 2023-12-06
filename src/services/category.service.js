const { Category } = require('../models');
const { handle, schemas } = require('./common');

const create = async (name) => {
  const { error } = schemas.categoryName.validate(name);
  if (error) return handle.error(error);
  const category = await Category.create({ name });
  return handle.create(category);
};

module.exports = {
  create,
};