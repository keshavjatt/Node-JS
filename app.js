const express = require("express");
const dotenv = require("dotenv").config();
require("./database/connection");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./database/connection");

const app = express();

require('./models/User');

app.use(express.json());

app.use('/user', userRoutes);

sequelize.sync().then(() => {
  app.listen(4590, () => {
    console.log("Server is running on port 4590");
  });
});
