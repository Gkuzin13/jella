const app = require('../../start'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

process.env.NODE_ENV === 'test';

const mongoose = require('mongoose');
const databaseName = 'test';

beforeAll(async () => {
  const url = `mongodb://127.0.0.1:27017/${databaseName}`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log(`MongoDB Connected: ${url}`);
});
afterAll(async () => {
  // Closes the Mongoose connection
  await mongoose.connection.close();
});
it('Gets the test endpoint', async (done) => {
  const res = await request.post('/b').send({ boardTitle: 'TEST' });

  done();
});
