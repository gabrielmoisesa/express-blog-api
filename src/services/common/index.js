const handle = require('./handlers');
const schemas = require('./schemas');
const generateToken = require('./generateToken');

module.exports = {
  handle,
  schemas,
  generateToken,
  excludePassword: { attributes: { exclude: ['password'] } },
};