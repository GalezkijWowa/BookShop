'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
      name: {
          allowNull: false,
          type: DataTypes.STRING
      },
      age: {
          allowNull: false,
          type: DataTypes.INTEGER
      }
  }, {});
  Author.associate = function(models) {
      Author.belongsToMany(models.Book, {
          through: 'BookAuthor',
          as: 'books',
          foreignKey: 'author_id'
      });
  };
  return Author;
};