import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Get db connection
import './config/mongoConfig.js';

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get('/', (req, res) => {
  res.send({ msg: 'Hello World' });
});
