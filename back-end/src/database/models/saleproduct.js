'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    sale_id: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    quantity: DataTypes.INTEGER,
  },{
    tableName: 'saleProducts',
    timestamps: false
  });
  
  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreingKey: 'sale_id',
      otherKey: 'product_id'
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreingKey: 'product_id',
      otherKey: 'sale_id'
    });
  }

  return SaleProduct;
};
