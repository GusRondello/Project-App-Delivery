const { productService } = require('../services');

const getAll = async (_req, res, _next) => {
  const products = await productService.getAll();

  return res.status(200).json({ products });
};

module.exports = {
  getAll,
};