const boom = require('@hapi/boom');
const md5 = require('md5');

const { User } = require('../database/models');
const { tokenHelper } = require('../helpers');

const checkUserExistsBy = async (data) =>
  User.findOne({
    where: { ...data },
  });

const login = async (userData) => {
  const { email, password } = userData;
  const encryptPassword = md5(password);
  const userExist = await checkUserExistsBy({
    email,
    password: encryptPassword,
  });

  if (!userExist) throw boom.notFound('User not found');

  const { id, name, role } = userExist;
  const token = tokenHelper.createToken({ id, name, email, role });

  return token;
};

const create = async (userData) => {
  const { name, email, password, role } = userData;
  const userExist = await checkUserExistsBy({ name, email });

  if (userExist) throw boom.conflict('Email address is already registered!');

  const encryptPassword = md5(password);

  return User.create({
    email,
    name,
    password: encryptPassword,
    role,
  });
};

const getSellers = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
    attributes: { exclude: ['password'] },
  });

  return sellers;
};

const getAllUsers = async () => {
  const users = User.findAll();

  return users;
};

module.exports = {
  login,
  create,
  checkUserExistsBy,
  getSellers,
  getAllUsers,
};
