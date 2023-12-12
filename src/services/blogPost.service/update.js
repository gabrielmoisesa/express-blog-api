const { BlogPost } = require('../../models');
const { schemas, handle } = require('../common');
const { getById } = require('./get');

const update = async (title, content, postId, userId) => {
  const { error } = schemas.updateBlogPost.validate({ title, content });
  if (error) return handle.error(error, true);

  await BlogPost.update({ title, content }, { where: { id: postId, userId } });
  
  const updatedPost = await getById(postId);
  return updatedPost;
};

module.exports = { update };