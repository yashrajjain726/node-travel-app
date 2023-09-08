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

//  MODELS
const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name must be provided'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour price must be provided'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

// SERVER CONFIG
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
