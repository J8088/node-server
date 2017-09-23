'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fileName: {
        type: Sequelize.TEXT
      },
      filePath: {
        type: Sequelize.TEXT
      },
      contentType: {
        type: Sequelize.TEXT
      },
      contentSize: {
        type: Sequelize.NUMERIC
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
    return queryInterface.dropTable('Files');
  }
};