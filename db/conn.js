const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const dbURL = process.env.CONNECTION_STRING;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Not connected to the Database:"));
db.once('open', () => {
  console.log("Connected to the Database");
});

module.exports = mongoose;
