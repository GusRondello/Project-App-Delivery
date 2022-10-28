const { Product } = require('../database/models');

const getAll = async () => {
  const products = Product.findAll({ attributes: { exclude: ['id'] } });

  return products;
};

module.exports = {
  getAll,
};
