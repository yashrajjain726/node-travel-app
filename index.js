const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000 || process.env.PORT;

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
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
