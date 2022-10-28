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
    timestamps: false
  });

  User.assosciate = (models) => {
    User.hasMany(models.Sale, { foreignkey: 'user_id', as: 'user_sale' });
    User.hasMany(models.Sale, { foreignkey: 'seller_id', as: 'seller_sale' });
  }

  return User;
};
