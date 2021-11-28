"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Task.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "タスクの内容は必須です" },
          notEmpty: { msg: "タスクの内容は必須です" },
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "tasks",
      modelName: "Task",
    }
  );
  return Task;
};
