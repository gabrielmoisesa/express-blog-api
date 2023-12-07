const { BlogPost, Category, PostCategory, User } = require('../models');
const { schemas, handle } = require('./common');

const getAll = async () => {
  const blogPostsFromDB = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return handle.getData(blogPostsFromDB);
};

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

module.exports = {
  getAll,
  create,
};