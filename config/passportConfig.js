const Account = require('../models/account');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    await Account.findOne({ email: email }, async (err, user) => {
      if (err) return done(err);

      if (!user) {
        return done(null, false, {
          error: 'The username or password you entered is incorrect.',
        });
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, {
            username: user.username,
            email: user.email,
            id: user._id,
          });
        } else {
          return done(null, false, {
            error: 'The username or password you entered is incorrect.',
          });
        }
      } catch (err) {
        return done(err);
      }
    }).clone();
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    await Account.findById(id, (err, user) => {
      if (err) return next(err);
      done(null, {
        username: user.username,
        email: user.email,
        id: user._id,
      });
    }).clone();
  });
};

module.exports = initialize;
