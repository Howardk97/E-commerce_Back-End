// Import express and routes
const express = require('express');
const routes = require('./routes');

// import sequelize connection
const sequelize = require('./config/connection');

// initialize app to be express and set port
const app = express();
const PORT = process.env.PORT || 3001;

// Get middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes data
app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
