const schemas = require('./schemas');
const { User } = require('../models');

const getByEmail = async (email, password) => {
  const { error } = schemas.login.validate({ email, password });
  if (error) {
    return { status: 'BAD_REQUEST', data: { message: 'Some required fields are missing' } }; 
  }

  const user = await User.findOne({ where: { email } });
  if (!user) return ({ status: 'BAD_REQUEST', data: { message: 'Invalid fields' } });
  
  return { status: 'OK', data: user.dataValues };
};

module.exports = {
  getByEmail,
};