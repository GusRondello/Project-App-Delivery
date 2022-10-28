const { Products } = require('../database/models');

const getAll = async () => {
  const products = Products.findAll({ attributes: { exclude: ['id'] } });

  return products;
};

module.exports = {
  getAll,
};
