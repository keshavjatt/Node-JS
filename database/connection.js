const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('express-js', 'root', 'Keshav@123#abc', {
  host: '127.0.01',
  dialect: 'mysql',
});

module.exports = sequelize;
