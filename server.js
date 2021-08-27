const express = require('express');
const flash = require('express-flash');
const helmet = require('helmet');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const Keygrip = require('keygrip');
const cookieSession = require('cookie-session');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    secret: process.env.SESSION_SECRET,
    keys: new Keygrip(['key1', 'key2'], 'SHA384', 'base64'),
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

if (process.env.NODE_ENV === 'production') {
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
