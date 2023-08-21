const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

// ROUTES
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

// MIDDLEWARE
app.use(express.json());
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

// SERVER CONFIG
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
