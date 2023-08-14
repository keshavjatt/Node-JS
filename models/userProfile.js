const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserProfile = sequelize.define('UserProfile', {
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = UserProfile;
