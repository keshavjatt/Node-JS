const express = require('express');
const app = express();
const sequelize = require('./config/database');
const routes = require('./routes/index');

sequelize.sync().then(()=>{console.log('connected')}).catch(e=>{console.error(e)}); // Sync models with the database

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
