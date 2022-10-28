const { Sale } = require('../database/models');
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

module.exports = {
  create,
};
