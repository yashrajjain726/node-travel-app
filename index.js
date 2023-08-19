const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API service' });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
