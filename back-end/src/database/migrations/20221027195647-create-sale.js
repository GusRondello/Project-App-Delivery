'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      seller_id: {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      delivery_address: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      delivery_number: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      sale_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status:{
        allowNull: false,
        type: Sequelize.STRING(50)
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
