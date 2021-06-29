import Account from '../models/account.js';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import passport from 'passport';

// Create account on POST
export const create_account_post = [
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
    await Account.find(
      { email: req.body.email, username: req.body.username },
      async (err, account) => {
        if (err) {
          return res.send({ errorMsg: err.message });
        }

        if (account) {
          return res.send({
            errorMsg: 'An account with this email or username already exists.',
          });
        }
      }
    );

    // Push new accont to DB
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newAcc = await new Account({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      }).save();
    } catch (err) {
      return res.send({ errorMsg: err.message });
    }
  },
];

// Handle login on POST
export const account_login_post = [
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureFlash: true,
  }),
];
