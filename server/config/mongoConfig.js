import mongoose from 'mongoose';
import dotenv from 'dotenv';

process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

// Set up default mongoose connection
const mongoDB = `mongodb+srv://mern:mongodb@cluster0.pnh31.mongodb.net/mern-app?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDb connection error:'));
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
