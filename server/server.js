const express = require('express');
const cors = require('cors');
const flash = require('express-flash');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

// Use passport config
const initialize = require('./config/passportConfig');
initialize(passport);

// Use api routes
const homeRouter = require('./routes/api/homeRouter');
const boardRouter = require('./routes/api/boardRouter');
const listRouter = require('./routes/api/listRouter');
const cardRouter = require('./routes/api/cardRouter');
const checklistRouter = require('./routes/api/checklistRouter');

const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    // allow to server to accept request from different origin
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allow session cookie from browser to pass through
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(flash());

app.use(homeRouter);
app.use(boardRouter);
app.use(listRouter);
app.use(cardRouter);
app.use(checklistRouter);

app.listen(port, () => {
  // Get db connection
  require('./config/mongoConfig');
  console.log(`Server is running on port: ${port}`);
});
