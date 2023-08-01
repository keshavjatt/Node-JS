const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/conn');

const app = express();
const port = 5000;

app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log("Server is connected");
});
