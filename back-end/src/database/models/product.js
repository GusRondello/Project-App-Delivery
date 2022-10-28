'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    url_image: DataTypes.STRING,
  },{
    tableName: 'products',
    timestamps: false
  });
  
  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct,
      { foreignkey: 'id', as: 'product_id'});
  }

  return Product;
};
