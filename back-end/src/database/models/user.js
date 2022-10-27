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
  }, { timestamps: false});

  User.assosciate = (models) => {
    User.hasMany(models.Sales, { foreignkey: 'userId', as: 'user_id' });
    User.hasMany(models.Sales, { foreignkey: 'userId', as: 'seller_id' });
  }

  return User;
};