const boom = require('@hapi/boom');
const { saleService } = require('../services');

const create = async (req, res, _next) => {
  const {
    userId,
    sellerId,
    totalPrice,
    deliveryAddress, 
    deliveryNumber, 
    saleDate, 
    products } = req.body;
  const result = await saleService.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    products,
  });

  res.status(201).json(result);
};

const getUserOrders = async (_req, res, _next) => {
  if (!res.locals.user) throw new Error('Response locals user variable was not defined');

  const { user: { id, role } } = res.locals;
  const userOrders = await saleService.getUserOrders({ id, role });

  return res.status(200).json(userOrders);
};

const getOrderById = async (req, res, _next) => {
  const { id } = req.params;
  const order = await saleService.getOrderById(id);
  
  return res.status(200).json(order);
};

const updateOrderStatus = async (req, res, _next) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!status) throw boom.badRequest('Status is required');

  const updateOrder = await saleService.updateOrderStatus({ id, status });
  
  return res.status(200).json(updateOrder);
};

module.exports = {
  create,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
};
