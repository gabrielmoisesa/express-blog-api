const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const httpMap = require('./httpMap');
const removeKey = require('./removeKey');

module.exports = {
  jwt,
  secret,
  httpMap,
  removeKey,
};