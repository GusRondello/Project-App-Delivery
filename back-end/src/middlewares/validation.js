const boom = require('@hapi/boom');

module.exports = (schema) => (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const { message } = error;

    throw boom.badRequest(message);
  }

  next();
};
