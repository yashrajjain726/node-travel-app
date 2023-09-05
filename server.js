/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./index');

const PORT = process.env.PORT || 3000;
const DB = process.env.MONGODB_URL.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connected to Database`);
  });

// SERVER CONFIG
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
