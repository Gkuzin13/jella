const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  // Get db connection when server starts
  require('./config/mongoConfig');

  console.log(`Server is running on port: ${port}`);
});

app.get('/', (req, res) => {
  res.send({ msg: 'Hello World' });
});
