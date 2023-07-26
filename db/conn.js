const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Excellence_DB')
    .then(() => console.log('Connected to the Database'))
    .catch(err => console.error('Not Connected to the Database', err));

module.exports = {}