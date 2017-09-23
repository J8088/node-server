'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductsToProductVariants = sequelize.define('ProductsToProductVariants', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: DataTypes.INTEGER,
    productVariantId: DataTypes.INTEGER,
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
  return ProductsToProductVariants;
};