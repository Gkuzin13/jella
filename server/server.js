import express from 'express';
import cors from 'cors';
import flash from 'express-flash';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

// Use passport config
import initialize from './config/passportConfig.js';
initialize(passport);

// Get db connection
import './config/mongoConfig.js';

// Use api routes
import homeRouter from './routes/api/homeRouter.js';
import boardRouter from './routes/api/boardRouter.js';
import listRouter from './routes/api/listRouter.js';
import cardRouter from './routes/api/cardRouter.js';

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(homeRouter);
app.use(boardRouter);
app.use(listRouter);
app.use(cardRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
