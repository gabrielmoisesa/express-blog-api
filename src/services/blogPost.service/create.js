const { BlogPost, Category, PostCategory } = require('../../models');
const { schemas, handle } = require('../common');

const create = async (title, content, userId, categoryIds) => {
  const { error } = schemas.blogPost.validate({ title, content, userId, categoryIds });
  if (error) return handle.error(error, true);

  const foundCategs = await Category.findAndCountAll({ where: { id: categoryIds } });
  if (foundCategs.count !== categoryIds.length) {
    return handle.error({ message: 'one or more "categoryIds" not found' });
  }

  const blogPost = await BlogPost.create({ title, content, userId });

  const postId = blogPost.dataValues.id;
  await PostCategory.bulkCreate(categoryIds.map((categoryId) => ({ postId, categoryId })));

  return handle.create(blogPost.dataValues);
};

module.exports = { create };