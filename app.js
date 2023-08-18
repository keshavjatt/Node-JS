const express = require('express');
const sequelize = require('./database/connection');
const userRoutes = require('./routes/userRoutes');

const app = express();

require('./models/User');

app.use(express.json());

app.use('/user', userRoutes);

sequelize.sync().then(() => {
  app.listen(4590, () => {
    console.log('Server is running on port 4590');
  });
});
