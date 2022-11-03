'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    urlImage: DataTypes.STRING,
  },{
    tableName: 'products',
    timestamps: false,
    underscored: true
  });
  
  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct,
      { foreignkey: 'id', as: 'productId'});
  }

  return Product;
};
