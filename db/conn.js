const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const dbConnectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(dbConnectionString)
    .then(() => console.log('Connected to the Database'))
    .catch(err => console.error('Not Connected to the Database', err));

module.exports = {};
