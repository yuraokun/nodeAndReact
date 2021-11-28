"use strict";
const faker = require("faker");
// faker.locale = "ja";
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: faker.internet.userName(),
          role: "user",
          email: faker.internet.email(),
          password: 12345,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.internet.userName(),
          role: "user",
          email: faker.internet.email(),
          password: 12345,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.internet.userName(),
          role: "user",
          email: faker.internet.email(),
          password: 12345,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.internet.userName(),
          role: "user",
          email: faker.internet.email(),
          password: 12345,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
