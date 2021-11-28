const { DataTypes } = require("sequelize/dist");

module.exports = (sequelize, DataType) => {
  const Review = sequelize.define("review", {
    rating: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  return Review;
};
