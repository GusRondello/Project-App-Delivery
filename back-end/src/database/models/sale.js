'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    totalPrice: DataTypes.DECIMAL(10,2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    status: DataTypes.STRING(50)
  }, {
    createdAt: 'saleDate',
    updatedAt: false,
    tableName: 'sales',
    // timestamps: false,
    underscored: true
  });

  Sale.associate = (models) => { 
    Sale.belongsTo(models.User,
      {foreingKey: 'userId', as: 'user' });

    Sale.belongsTo(models.User,
      {foreingKey: 'sellerId', as: 'seller' });
  };

  return Sale;
};
