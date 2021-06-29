import Account from '../models/account.js';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

const initialize = (passport) => {
  const authenticateUser = (email, password, done) => {
    Account.findOne({ email: email }, async (err, account) => {
      if (err) return done(err);

      if (!account) {
        return done(null, false, { errorMsg: 'Incorrect email.' });
      }

      try {
        if (await bcrypt.compare(password, account.password)) {
          return done(null, account);
        } else {
          return done(null, false, { errorMsg: 'Incorrect password.' });
        }
      } catch (err) {
        return done(err);
      }
    });
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    Account.findById(id, (err, user) => {
      if (err) return next(err);
      done(null, user.id);
    });
  });
};

export default initialize;
