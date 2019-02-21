'use strict';
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: DataTypes.INTEGER,
        title: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
      Book.hasMany(models.Page, {
          foreignKey: 'bookId',
          as: 'pages',
      });
  };
  return Book;
};