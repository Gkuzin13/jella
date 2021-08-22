const Account = require('../models/account');
const bcrypt = require('bcrypt');
const populate = require('../utils/populateBoard');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

// Create account on POST
exports.create_account_post = [
  // Validate form fields
  body('email', 'Must be a valid email address,').isEmail(),
  body('username', 'Username must not be empty.').isLength({ min: 1, max: 16 }),
  body('password', 'Password must be at least 8 characters long.').isLength({
    min: 8,
    max: 32,
  }),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ error: errors.array({ onlyFirstError: true })[0] });
    }

    // Check if account exists
    try {
      await Account.findOne({ email: req.body.email }, async (err, account) => {
        if (err) {
          return res.send(err);
        }

        if (account) {
          return res.send({
            error:
              'An account with this username or email address already exists.',
          });
        }

        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);

          // Save new accont to db
          await new Account({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
          }).save();

          // Run next function to login the registered account
          next();
        } catch (err) {
          return res.send(err);
        }
      });
    } catch (error) {
      res.send(error);
    }
  },
];

// Create guest account on POST
exports.create_guest_account = [
  // Validate form fields
  body('email', 'Must be a valid email address,').isEmail(),
  body('password', 'Password must be at least 8 characters long.').isLength({
    min: 8,
    max: 32,
  }),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ error: errors.array({ onlyFirstError: true })[0] });
    }

    try {
      // Save new accont to db
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Save new accont to db
      const account = await new Account({
        email: req.body.email,
        username: 'Guest',
        password: hashedPassword,
      }).save();
      console.log(account._id);

      await populate.populateGuestBoard(account._id);

      next();
    } catch (err) {
      return res.send(err);
    }
  },
];

// Handle login on POST
exports.account_login_post = [
  // Validate form fields
  body('email', 'Must be a valid email address,').isEmail(),
  body('password', 'Password must be at least 8 characters long.').isLength({
    min: 8,
    max: 32,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ error: errors.array({ onlyFirstError: true })[0] });
    }

    // Login account
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.send(err);
      }

      if (!user) {
        res.send(info);

        return;
      }

      req.login(user, (err) => {
        if (err) return res.send(err);

        res.send({ ...user });
      });
    })(req, res, next);
  },
];

// Check if user is authenticated
exports.user_get = (req, res, next) => {
  if (req.user) {
    return res.send(req.user);
  }

  res.send(null);

  next();
};

// Logout account
exports.account_logout = (req, res, next) => {
  req.logout();

  res.sendStatus(200);

  next();
};
