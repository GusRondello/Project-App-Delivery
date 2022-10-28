const boom = require('@hapi/boom');
const { checkUserExistsBy } = require('./userService');
const { Sale, User } = require('../database/models');
const { SaleProduct } = require('../database/models');

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

  await SaleProduct.bulkCreate(...insertData);
};

const getUserOrders = async (userEmail) => {
  const user = checkUserExistsBy(userEmail);

  if (!user) throw boom.notFound('User not found');

  const findUserOrders = await Sale.findAll({
    where: { userId: user.id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
    attributes: { exclude: ['userId'] },
  });
  return findUserOrders;
};

const getOrderById = async (id) => {
  const orderFound = Sale.findByPk(id);

  if (!orderFound) throw boom.notFound('Order not found');

  return orderFound;
};

module.exports = {
  create,
  getUserOrders,
  getOrderById,
};
