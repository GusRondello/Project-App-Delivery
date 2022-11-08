const boom = require('@hapi/boom');
const md5 = require('md5');
const { Op } = require('sequelize');

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
  const users = await User.findAll({
    where: { 
      role: {
        [Op.ne]: 'administrator',
      },
    },
    attributes: { exclude: ['password'] },
  });

  return users;
};

const destroy = async (id) => {
  const userIsAdmin = await User.findOne({
    where: { id, role: 'administrator' },
  });

  if (userIsAdmin) throw boom.conflict('User is an administrator');

  const rowsAffected = await User.destroy({ where: { id } });

  if (rowsAffected === 0) throw boom.notFound('User not found');
};

module.exports = {
  login,
  create,
  checkUserExistsBy,
  getSellers,
  getAllUsers,
  destroy,
};
