const Joi = require('joi');

const userSchema = {
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
};

const user = Joi.object({ ...userSchema });

const login = Joi.object({
  email: userSchema.email,
  password: userSchema.password,
});

module.exports = {
  user,
  login,
};