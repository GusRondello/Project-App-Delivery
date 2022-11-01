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

const updateOrderStatus = async ({ id, status }) => {
  const statusValues = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];

  if (!statusValues.includes(status)) throw boom.badRequest('Invalid status');

  const sale = await Sale.update({ status }, { where: { id } });

  if (!sale) throw boom.notFound('Order not found');

  const updatedSale = await Sale.findByPk(id);

  return updatedSale;
};

module.exports = {
  create,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
};
