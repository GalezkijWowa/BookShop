'use strict';
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    content: DataTypes.STRING
  }, {});
  Page.associate = function(models) {
    // associations can be defined here
  };
  return Page;
};