const { User } = require('../models');
const { schemas, handle, generateToken } = require('./common');

const authWithToken = async (email, password) => {
  const { error } = schemas.login.validate({ email, password });
  if (error) return handle.error(error, true);
  
  const user = await User.findOne({ where: { email } });
  if (!user) return handle.error({ message: 'Invalid fields' });

  const token = generateToken(user.dataValues);
  return handle.getData({ token });
};

module.exports = {
  authWithToken,
};