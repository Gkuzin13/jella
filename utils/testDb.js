const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

// Connect to memory db
module.exports.connect = async () => {
  const uri = await mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  };

  await mongoose.connect(uri, mongooseOpts);
};

// Disconnect and close db connection
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

// Clear the db and remove all data
module.exports.clearDatabase = async () => {
  await mongoose.connection.dropDatabase();

  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
