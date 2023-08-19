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
    status: 200,
    results: tours.length,
    data: {
      tours,
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
        status: 201,
        data: { tour: newTour },
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
