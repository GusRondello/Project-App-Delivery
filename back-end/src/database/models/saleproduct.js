'use strict';
module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('saleProduct', {
    sale_id: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    quantity: DataTypes.INTEGER,
  },{ timestamps: false});
  
  saleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Products, {
      as: 'products',
      through: saleProduct,
      foreingKey: 'sale_id',
      otherKey: 'product_id'
    });
    models.Product.belongsToMany(models.Sales, {
      as: 'sales',
      through: saleProduct,
      foreingKey: 'product_id',
      otherKey: 'sale_id'
    });
  }

  return saleProduct;
};