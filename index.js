const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const db = require("./db/conn");

const users = require('./routes/users');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/users', users);

const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`Listening on port ${port}...`));

