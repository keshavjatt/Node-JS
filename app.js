const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.Connection_String, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

app.use(express.json());

app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
