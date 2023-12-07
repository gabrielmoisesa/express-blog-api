const { User } = require('../models');
const { schemas, handle, generateToken, excludePassword } = require('./common');

const getAll = async () => {
  const users = await User.findAll(excludePassword);
  return handle.getData(users);
};

const getById = async (id) => {
  const user = await User.findByPk(id, excludePassword);
  if (!user) return handle.notFound('User does not exist');
  return handle.getData(user, 'user');
};

const create = async (user) => {
  const { error } = schemas.user.validate(user);
  if (error) return handle.error(error);

  const existingUser = await User.findOne({ where: { email: user.email } });
  if (existingUser) return handle.conflict('User already registered');

  const createdUser = await User.create(user);
  const token = generateToken(createdUser.dataValues);
  return handle.create({ token });
};

module.exports = {
  getAll,
  getById,
  create,
};