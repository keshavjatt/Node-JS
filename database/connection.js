const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.MySQL_USERNAME, process.env.MySQL_PASSWORD, {
  host: process.env.MySQL_IP,
  dialect: 'mysql',
});

module.exports = sequelize;