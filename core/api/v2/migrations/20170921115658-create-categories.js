'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryParentId: {
        type: Sequelize.INTEGER
      },
      categoryType: {
        type: Sequelize.TEXT
      },
      categoryCode: {
        type: Sequelize.TEXT
      },
      categoryName: {
        type: Sequelize.TEXT
      },
      categoryDesc: {
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
    return queryInterface.dropTable('Categories');
  }
};