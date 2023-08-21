const app = require('./index');
const PORT = 3000 || process.env.PORT;

// SERVER CONFIG
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
