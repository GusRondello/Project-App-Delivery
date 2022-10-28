const boom = require('@hapi/boom');
const { tokenHelper } = require('../helpers');

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw boom.badRequest('Token not found');

  tokenHelper.validateToken(authorization);

  next();
};
