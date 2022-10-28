'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      foreingKey: true,
    },
    total_price: DataTypes.FLOAT,
    delivery_address: DataTypes.STRING(100),
    delivery_number: DataTypes.STRING(50),
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING(50)
  }, {
    tableName: 'sales',
    timestamps: false
  });

  Sale.associate = (models) => { 
    Sale.belongsTo(models.User,
      {foreingKey: 'user_id', as: 'user' });

    Sale.belongsTo(models.User,
      {foreingKey: 'seller_id', as: 'seller' });
  };

  return Sale;
};
