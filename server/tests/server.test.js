import app from '../server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Account from '../models/account';

beforeEach((done) => {
  mongoose.connect(
    `mongodb+srv://mern:mongodb@cluster0.pnh31.mongodb.net/mern-app?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test('POST /sign-up', async () => {
  const account = await Account.create({
    email: 'test@mail.com',
    username: 'test',
    password: '12345678',
  });
});
