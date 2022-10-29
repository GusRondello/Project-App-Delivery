const { Product } = require('../database/models');

const getAll = async () => {
  const products = Product.findAll();

  return products;
};

module.exports = {
  getAll,
};
