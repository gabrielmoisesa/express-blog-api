const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const httpMap = require('./httpMap');

module.exports = {
  jwt,
  secret,
  httpMap,
};