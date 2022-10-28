const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
require('dotenv/config');

const utils = require('../utils');

const JWT_SECRET = utils.getSecretKey();

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  return token;
};

const validateToken = (token) => {
  if (!token) {
    throw boom.badRequest('Token not found');
  }
  
  const decoded = jwt.verify(token, JWT_SECRET, (err, decode) => {
    console.log(token);
    if (err) {
      throw boom.unauthorized('Expired or invalid token');
    }
    
    return decode;
  });

  return decoded;
};

module.exports = { createToken, validateToken };
