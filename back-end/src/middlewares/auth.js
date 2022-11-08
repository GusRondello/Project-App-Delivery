const boom = require('@hapi/boom');
const { tokenHelper } = require('../helpers');

module.exports = (role) => (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) throw boom.badRequest('Token not found');
  
  const payload = tokenHelper.validateToken(authorization);
  
  if (role !== payload.role) throw boom.unauthorized('User unauthorized');
  
  res.locals.user = { ...payload };
  
  next();
};
