const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
require('dotenv/config');

const { JWT_SECRET } = process.env;

const createToken = (data) => {
  const token = jwt.sign({ data }, JWT_SECRET);
  return token;
};

const validateToken = (token) => {
  if (!token) {
    throw boom.badRequest('Token not found');
  }
  
  const decoded = jwt.verify(token, JWT_SECRET, (err, decode) => {
    if (err) {
      throw boom.unauthorized('Expired or invalid token');
    }
    
    return decode;
  });

  return decoded;
};

module.exports = { createToken, validateToken };
