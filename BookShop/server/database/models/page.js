"use strict";
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define("Page", {
      content: {
          allowNull: false,
          type: DataTypes.STRING
      },
      number: {
          allowNull: false,
          type: DataTypes.INTEGER
      },
      book_id: {
          allowNull: false,
          type: DataTypes.INTEGER
      }
  }, {});
    Page.associate = function (models) {
        Page.belongsTo(models.Book, {
            foreignKey: "book_id",
            as: "book"
        });
    };
  return Page;
};