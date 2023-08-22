const express = require('express');
const morgan = require('morgan');

const app = express();

// ROUTES
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // MORGAN IS USED AS A LOGGER FOR  DEVELOPMENT MODE
}
app.use(express.json());
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
