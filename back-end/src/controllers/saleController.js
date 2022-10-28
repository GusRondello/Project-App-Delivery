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

module.exports = {
  create,
};
