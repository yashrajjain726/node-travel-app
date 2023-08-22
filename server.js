const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./index');
const PORT = process.env.PORT || 3000;

// SERVER CONFIG
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
