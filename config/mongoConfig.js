const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

// Set up default mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDb connection error:'));
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
