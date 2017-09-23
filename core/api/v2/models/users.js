'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    userId: DataTypes.INTEGER,
    userName: DataTypes.TEXT,
    createdDate: DataTypes.DATE,
    modifiedDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};