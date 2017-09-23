'use strict';
module.exports = (sequelize, DataTypes) => {
  var Attributes = sequelize.define('Attributes', {
    attributeId: DataTypes.INTEGER,
    attributeCode: DataTypes.TEXT,
    attributeType: DataTypes.TEXT,
    attributeName: DataTypes.TEXT,
    attributeDesc: DataTypes.TEXT,
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
  return Attributes;
};