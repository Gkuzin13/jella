const Account = require('../models/account');
const bcrypt = require('bcrypt');
const populate = require('../utils/populateBoard');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

// Create account on POST
exports.create_account_post = [
  // Validate form fields
  body('email', 'Must be a valid email address,').isEmail(),
  body('username', 'Username must not be empty.').isLength({ min: 1, max: 64 }),
  body('password', 'Password must be at least 8 characters long.').isLength({
    min: 8,
    max: 32,
  }),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ error: errors.array({ onlyFirstError: true })[0].msg });
    }
    // Check if user exists in db
    try {
      const user = await Account.findOne({ email: req.body.email });
      if (user) {
        return res.send({
          error:
            'An account with this username or email address already exists.',
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await Account.create({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      });
      next();
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
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const account = await Account.create({
        email: req.body.email,
        username: 'Guest',
        password: hashedPassword,
      });
      await populate.populateGuestBoard(account._id);
      next();
    } catch (err) {
      res.send(err);
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
        return res.send(info);
      }
      req.login(user, (err) => {
        if (err) return res.send(err);

        res.send(user);
      });
    })(req, res, next);
  },
];

// Check if user is authenticated
exports.user_get = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.send(req.user);
  }

  res.send(null);
};

// Logout account and clear cookies
exports.account_logout = (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) return res.sendStatus(403);
    return res.sendStatus(200);
  });
};
