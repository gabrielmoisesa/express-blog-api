const { User } = require('../models');
const { schemas, handle } = require('./common');

const getByEmail = async (email, password) => {
  const { error } = schemas.login.validate({ email, password });
  if (error) return handle.error(error);
  
  const user = await User.findOne({ where: { email } });
  return handle.getData(user);
};

module.exports = {
  getByEmail,
};