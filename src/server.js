require('dotenv').config();
const app = require('./app');
const db = require('../models'); // Sequelize models

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database', err);
  process.exit(1);
});
