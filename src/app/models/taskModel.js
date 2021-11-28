const { DataTypes } = require("sequelize/dist");

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reminder: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Task;
};
