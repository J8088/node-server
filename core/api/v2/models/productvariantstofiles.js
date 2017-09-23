'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductVariantsToFiles = sequelize.define('ProductVariantsToFiles', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: DataTypes.INTEGER,
    fileId: DataTypes.INTEGER,
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
  return ProductVariantsToFiles;
};