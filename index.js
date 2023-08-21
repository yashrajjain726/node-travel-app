const express = require('express');
const app = express();

// ROUTES
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

// MIDDLEWARE
app.use(express.json());
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
