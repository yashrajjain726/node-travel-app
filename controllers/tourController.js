const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({ status: 'Failed', message: 'Invalid tour' });
  next();
};

exports.checkCreateTourBody = (req, res, next) => {
  console.log('req.body :' + req.body);
  if (!req.body.name) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Name must be a provided & should be a String',
    });
  } else if (!req.body.duration) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Duration must be a provided & should be a Number',
    });
  } else if (!req.body.price) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Price must be a provided & should be a Number',
    });
  } else if (!req.body.description) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Description must be provided & should be a String',
    });
  } else if (!req.body.difficulty) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Difficulty must be a provided & should be a String',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);
  res.json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

exports.addTour = (req, res) => {
  const { name, duration, difficulty, price, description } = req.body;
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, name, duration, difficulty, price, description };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../data/tours-simple.json`,
    JSON.stringify(tours),
    (callback) => {
      res.json({
        message: 'Your data has been added successfully.',
        status: 'Success',
        data: { tour: newTour },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);
  const { name, duration, difficulty, price, description } = req.body;
  if (!name || !duration || !price || !description || !difficulty) {
    tour.name = name ?? tour.name;
    tour.duration = duration ?? tour.duration;
    tour.price = price ?? tour.price;
    tour.description = description ?? tour.description;
    tour.difficulty = difficulty ?? tour.difficulty;
  }
  tours[req.params.id] = tour;

  console.log(tours);

  fs.writeFile(
    `${__dirname}/../data/tours-simple.json`,
    JSON.stringify(tours),
    (callback) => {
      res.json({
        status: 'Success',
        message: 'Updated tour',
        data: {
          tour,
        },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);
  const output = tours.filter((current) => current.id != tour.id);
  fs.writeFile(
    `${__dirname}/../data/tours-simple.json`,
    JSON.stringify(output),
    (callback) => {
      res.status(204).json({
        status: 'Success',
        data: null,
      });
    }
  );
};
