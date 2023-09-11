/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((element) => delete queryObj[element]);

    // WAY 1 FILTERING
    // const queriedResult = await Tour.find(queryObj);

    // WAY 2 FILTERING
    // const queriedResult = await Tour.find()
    //   .where('duration')
    //   .equals(req.query.duration)
    //   .where('difficulty')
    //   .equals(req.query.difficulty)
    //   .equals(req.query.difficulty);

    // ADVANCED FILTERING
    //  {'difficulty':'easy',duration:{$gte:5}}
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`,
    ); // replacing the query

    const queriedResult = await Tour.find(JSON.parse(queryString));
    const tours = await queriedResult;

    return res.json({
      status: 'Success',
      results: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    return res.json({
      status: 'Success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.addTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    return res.json({
      message: 'Your data has been added successfully.',
      status: 'Success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.json({
      message: 'Your data has been updated successfully.',
      status: 'Success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    return res.json({
      message: 'Your data has been deleted successfully.',
      status: 'Success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};
