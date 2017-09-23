'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductVariants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productPrice: {
        type: Sequelize.DECIMAL
      },
      productPriceDisc: {
        type: Sequelize.TEXT
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      modifiedBy: {
        type: Sequelize.INTEGER
      },
      createdDate: {
        type: Sequelize.DATE
      },
      modifiedDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductVariants');
  }
};