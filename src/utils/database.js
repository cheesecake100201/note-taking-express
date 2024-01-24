// src/utils/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  port: "3306",
  username: "root",
  password: "sarthak@100201",
  database: "note_app",
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
