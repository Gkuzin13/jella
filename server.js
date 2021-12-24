const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo');

// process.env.NODE_ENV = 'production';
require('dotenv').config();

// Use passport config
const initialize = require('./config/passportConfig');
initialize(passport);

const homeRouter = require('./routes/api/homeRouter');
const boardRouter = require('./routes/api/boardRouter');
const listRouter = require('./routes/api/listRouter');
const cardRouter = require('./routes/api/cardRouter');

const app = express();

const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: 'sessions',
  }),
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', homeRouter);
app.use('/api', boardRouter);
app.use('/api', listRouter);
app.use('/api', cardRouter);

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy

  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  // Get db connection
  require('./config/mongoConfig');
  console.log(`Server is running on port: ${port}`);
});
