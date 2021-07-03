const Account = require('../models/account');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const initialize = (passport) => {
  const authenticateUser = (email, password, done) => {
    Account.findOne({ email: email }, async (err, user) => {
      if (err) return done(err);

      if (!user) {
        return done(null, false, { errorMsg: 'Incorrect email.' });
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, {
            username: user.username,
            email: user.email,
            id: user._id,
          });
        } else {
          return done(null, false, { errorMsg: 'Incorrect password.' });
        }
      } catch (err) {
        return done(err);
      }
    });
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    Account.findById(id, (err, user) => {
      if (err) return next(err);
      done(null, {
        username: user.username,
        email: user.email,
        id: user._id,
      });
    });
  });
};

module.exports = initialize;