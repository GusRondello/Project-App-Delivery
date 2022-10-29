const boom = require('@hapi/boom');
const { tokenHelper } = require('../helpers');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw boom.badRequest('Token not found');

  const payload = tokenHelper.validateToken(authorization);
  res.locals.user = { ...payload };

  next();
};
