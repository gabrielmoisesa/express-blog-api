const { getAll, getById, getByQuery } = require('./get');
const { create } = require('./create');
const { update } = require('./update');
const { deleteById } = require('./delete');

module.exports = { 
  getAll, 
  getById, 
  getByQuery, 
  create, 
  update, 
  deleteById, 
};