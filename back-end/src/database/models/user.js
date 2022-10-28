'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true
  });

  User.assosciate = (models) => {
    User.hasMany(models.Sale, { foreignkey: 'userId', as: 'userSale' });
    User.hasMany(models.Sale, { foreignkey: 'sellerId', as: 'sellerSale' });
  }

  return User;
};
