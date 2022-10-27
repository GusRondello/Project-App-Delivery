const Joi = require('joi');

const login = Joi.object({
  email: Joi.string().email().required().messages({
    
  }),
  password: Joi.string().min(6).required(),
});
const create = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  login,
  create,
};
