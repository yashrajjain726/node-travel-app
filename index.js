const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000 || process.env.PORT;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);
  if (!tour)
    return res.status(404).json({ status: 'Failed', message: 'Invalid tour' });
  res.json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const { name, duration, difficulty, price, description } = req.body;
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, name, duration, difficulty, price, description };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(tours),
    (callback) => {
      res.json({
        message: 'Your data has been added successfully.',
        status: 'Success',
        data: { tour: newTour },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);
  if (!tour) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid tour' });
  }
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
    `${__dirname}/data/tours-simple.json`,
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id == req.params.id);
  console.log(tour);
  if (!tour)
    return res.status(404).json({ status: 'Failed', message: 'Invalid tour' });
  const output = tours.filter((current) => current.id != tour.id);
  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(output),
    (callback) => {
      res.status(204).json({
        status: 'Success',
        data: null,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
