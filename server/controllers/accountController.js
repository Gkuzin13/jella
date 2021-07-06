const Account = require('../models/account');
const bcrypt = require('bcrypt');
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
      return res.send({ errorMsg: errors.array() });
    }

    // Check if account exists
    await Account.findOne({ email: req.body.email }, async (err, account) => {
      if (err) {
        return res.send(err);
      }

      if (account) {
        res
          .status(401)
          .send(
            'An account with this username or email address already exists.'
          );

        return;
      }

      // Save new accont to db
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newAcc = await new Account({
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
        }).save();

        return res.send({
          email: newAcc.email,
          username: newAcc.username,
          id: _id,
        });
      } catch (err) {
        return res.send(err);
      }
    });
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
      return res.send({ errorMsg: errors.array() });
    }

    passport.authenticate('local', (err, user) => {
      if (err) {
        return res.send(err);
      }

      if (!user) return res.send('No user exists!');

      req.login(user, (err) => {
        if (err) return res.send(err);

        res.status(200).send({ ...user });
      });
    })(req, res, next);
  },
];

exports.user_get = (req, res, next) => {
  if (req.user) {
    return res.send(req.user);
  }

  res.send(null);

  next();
};
