const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name must be provided'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour duration must be provided'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour group size must be provided'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour difficulty must be provided'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour price must be provided'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour summary must be provided'],
  },
  description: { type: String, trim: true },
  imageCover: {
    type: String,
    required: [true, 'A tour image must be provided'],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // so, when requested from the api, it will be not sent (another way of limiting fields)
  },
  startDates: { type: [Date] },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
