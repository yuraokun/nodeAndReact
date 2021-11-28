"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Task }) {
      // define association here
      this.hasMany(Task, { foreignKey: "userId", as: "tasks" });
    }

    toJSON() {
      return {
        ...this.get(),
        password: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "emailは必須です" },
          notEmpty: { msg: "emailは必須です" },
          isEmail: { msg: "適切なメールアドレスを入力してください" },
          async isUnique(email) {
            const result = await User.count({ where: { email: email } });
            if (result) {
              throw new Error("ログインしてください");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "パスワードは必須です" },
          notEmpty: { msg: "パスワードは必須です" },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
