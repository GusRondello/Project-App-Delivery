const boom = require('@hapi/boom');
const { tokenHelper } = require('../helpers');
const { userService } = require('../services');

const login = async (req, res, _next) => {
  const { email, password } = req.body;
  const token = await userService.login({ email, password });

  return res.status(200).json({ token });
};

const create = async (req, res, _next) => {
  const { name, email, password, role } = req.body;
  const { id } = await userService.create({ name, email, password, role });

  return res.status(201).json({
    id,
    name,
    email,
    role,
  });
};

const createCustomer = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const { id, role } = await userService.create({
    name,
    email,
    password,
    role: 'customer',
  });
  const token = tokenHelper.createToken({ id, name, email, role });

  return res.status(201).json({ token });
};

const getSellers = async (req, res, _next) => {
  const result = await userService.getSellers();

  return res.status(200).json(result);
};

const getAllUsers = async (_req, res, _next) => {
  const result = await userService.getAllUsers();

  return res.status(200).json(result);
};

const destroy = async (req, res, _next) => {
  const { id } = req.params;
  const parseInt = +id;

  if (Number.isNaN(parseInt)) throw boom.badRequest('ID params should be a number');

  await userService.destroy(id);

  return res.sendStatus(204);
};

module.exports = {
  login,
  create,
  getSellers,
  createCustomer,
  getAllUsers,
  destroy,
};
