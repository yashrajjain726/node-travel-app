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

    let queriedResult = Tour.find(JSON.parse(queryString));

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); // WHEN TWO SORT PARAMS HAVE SAME VALUES EX, WHEN TWO TOURS HAVE SAME PRICING, THEN WE CAN SORT THOSE TWO WITH SECOND PARAM // sort('price ratingsAverage'), but in postman spacing is not allowed so use this instead sortBY condition
      queriedResult = queriedResult.sort(sortBy);
    } else {
      queriedResult = queriedResult.sort('-createdAt'); // IF USER STILL DOESNOT GIVE ANY SORTING THING, SORT IT WITH LATEST CREATED
      // -createdAt means from latest to old
      // createdAt means from oldest to newest
    }

    // LIMITING FIELDS
    // SUPPOSE WE WANT TO KEEP ALL THE DATA IN THE DATABASE BUT WANTED TO SHOW SOME TO THE REQUESTED CLIENT
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      queriedResult = queriedResult.select(fields);
    } else {
      queriedResult = queriedResult.select('-__v'); // BY DEFAULT, WE DONT WANT THE OUTER USER TO SEE THE FIELD __v FROM THE MONGODB
    }

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
