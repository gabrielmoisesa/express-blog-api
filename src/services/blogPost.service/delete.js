const { BlogPost, PostCategory } = require('../../models');
const { handle } = require('../common');

const deleteById = async (id) => {
  await PostCategory.destroy({ where: { postId: id } });
  await BlogPost.destroy({ where: { id } });
  return handle.noContent();
};

module.exports = { deleteById };