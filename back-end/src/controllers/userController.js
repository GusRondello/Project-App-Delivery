const { userService } = require('../services');

const login = async (req, res, _next) => {
  const { email, password } = req.body;
  const token = await userService.login({ email, password });

  return res.status(200).json({ token });
};

const create = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const token = await userService.create({ name, email, password });

  return res.status(201).json({ token });
};

const getSellers = async (req, res, _next) => {
  const result = await userService.getSellers();

  return res.status(201).json(result);
};

module.exports = {
  login,
  create,
  getSellers,
};
