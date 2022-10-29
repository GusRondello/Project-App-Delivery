'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    quantity: DataTypes.INTEGER,
  },{
    tableName: 'saleProducts',
    timestamps: false,
    underscored: true,
  });
  
  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreingKey: 'saleId',
      otherKey: 'productId'
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreingKey: 'productId',
      otherKey: 'saleId'
    });
  }

  return SaleProduct;
};
