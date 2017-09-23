'use strict';
module.exports = (sequelize, DataTypes) => {
  var Files = sequelize.define('Files', {
    fileId: DataTypes.INTEGER,
    fileName: DataTypes.TEXT,
    filePath: DataTypes.TEXT,
    contentType: DataTypes.TEXT,
    contentSize: DataTypes.NUMERIC,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER,
    createdDate: DataTypes.DATE,
    modifiedDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Files;
};