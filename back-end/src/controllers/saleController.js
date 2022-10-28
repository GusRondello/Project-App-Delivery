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
  await saleService.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    products,
  });

  res.sendStatus(201);
};

const getUserOrders = async (req, res, _next) => {
  const { email } = req.body;
  const userOrders = saleService.getUserOrders(email);

  return res.status(200).json(userOrders);
};

const getOrderById = async (req, res, _next) => {
  const { id } = req.params;
  const order = saleService.getOrderById(id);
  
  return res.status(200).json(order);
};

module.exports = {
  create,
  getUserOrders,
  getOrderById,
};
