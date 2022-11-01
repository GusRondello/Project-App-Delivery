const boom = require('@hapi/boom');
const { Sale, SaleProduct } = require('../database/models');

const create = async ({ products, ...data }) => {
  const saleCreated = await Sale.create({
    ...data,
    saleDate: new Date(),
    status: 'Pendente',
  });

  const insertData = products.map(({ id, quantity }) => ({
    saleId: saleCreated.id,
    productId: id,
    quantity,
  }));

  await SaleProduct.bulkCreate(insertData);

  return saleCreated;
};

const getUserOrders = async (userId) => {
  const findUserOrders = await Sale.findAll({
    where: { userId },
  });
  return findUserOrders;
};

const getOrderById = async (id) => {
  const orderFound = await Sale.findByPk(id);

  if (!orderFound) throw boom.notFound('Order not found');

  return orderFound;
};

module.exports = {
  create,
  getUserOrders,
  getOrderById,
};
