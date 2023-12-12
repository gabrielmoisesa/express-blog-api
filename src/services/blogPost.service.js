const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../models');
const { schemas, handle } = require('./common');

const getAll = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return handle.getData(blogPosts);
};

const getById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!blogPost) return handle.notFound('Post does not exist');
  return handle.getData(blogPost);
};

const getByQuery = async (q) => {
  const blogPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return handle.getData(blogPosts);
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

const update = async (title, content, postId, userId) => {
  const { error } = schemas.updateBlogPost.validate({ title, content });
  if (error) return handle.error(error, true);

  await BlogPost.update({ title, content }, { where: { id: postId, userId } });
  
  const updatedPost = await getById(postId);
  return updatedPost;
};

const deleteById = async (id) => {
  await PostCategory.destroy({ where: { postId: id } });
  await BlogPost.destroy({ where: { id } });
  return handle.noContent();
};

module.exports = { getAll, getById, getByQuery, create, update, deleteById };