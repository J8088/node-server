'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductVariantsToAttributes = sequelize.define('ProductVariantsToAttributes', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productVariantId: DataTypes.INTEGER,
    attributeId: DataTypes.INTEGER,
    value: DataTypes.TEXT,
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
  return ProductVariantsToAttributes;
};