const Joi = require('joi');

const userSchema = {
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
};

const blogPostSchema = {
  title: Joi.string().required(),
  content: Joi.string().required(),
  userId: Joi.number().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
};

const user = Joi.object({ ...userSchema });

const login = Joi.object({
  email: userSchema.email,
  password: userSchema.password,
});

const categoryName = Joi.string().required().label('name');

const blogPost = Joi.object({ ...blogPostSchema });

const updateBlogPost = Joi.object({ title: blogPostSchema.title, content: blogPostSchema.content });

module.exports = {
  user,
  login,
  categoryName,
  blogPost,
  updateBlogPost,
};