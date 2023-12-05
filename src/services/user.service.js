const { User } = require('../models');
const { schemas, handle, generateToken } = require('./common');

const getAll = async () => {
  const users = await User.findAll();
  return handle.getData(users);
};

const create = async (user) => {
  const { error } = schemas.user.validate(user);
  if (error) return handle.error(error);

  const existingUser = await User.findOne({ where: { email: user.email } });
  if (existingUser) return handle.error({ message: 'User already registered' });

  await User.create(user);
  const token = generateToken(user);
  return handle.create({ token });
};

module.exports = {
  getAll,
  create,
};