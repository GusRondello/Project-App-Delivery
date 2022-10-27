const boom = require('@hapi/boom');
const md5 = require('md5');

const { User } = require('../database/models');
const tokenHelper = require('../middlewares/jwtMiddleware');

const login = async (userData) => {
  const { email, password } = userData;

  const userExist = await User.findOne({
    where: { email },
  });

  if (!userExist) throw boom.notFound('User not found');

  const { id, name, role, password: userpassword } = userExist;
  const encryptPassword = md5(password);

  if (userpassword !== encryptPassword) throw boom.unauthorized('Invalid password');

  const token = tokenHelper.createToken({ id, name, role });

  return token;
};

const create = async (userData) => {
    const { name, email, password } = userData;

    const encryptPassword = md5(password);
    
    const createUser = await User.create({ name, email, password: encryptPassword });
    
    return createUser;
};

module.exports = {
  login,
  create,
};
