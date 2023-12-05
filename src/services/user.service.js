const { User } = require('../models');
const { removeKey } = require('../utils');
const { schemas, handle, generateToken } = require('./common');

const getAll = async () => {
  const usersFromDB = await User.findAll();
  const users = usersFromDB.map((user) => removeKey(user.dataValues, 'password'));
  return handle.getData(users);
};

const getById = async (id) => {
  const userFromDB = await User.findByPk(id);
  if (!userFromDB) return handle.error({ message: 'User does not exist' });
  const user = removeKey(userFromDB.dataValues, 'password');
  return handle.getData(user, 'user');
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
  getById,
  create,
};