const router = require('express').Router();
const accountController = require('../../controllers/accountController');
const auth = require('../../middleware/auth');

router.post('/signup', accountController.create_account_post);

router.post('/login', accountController.account_login_post);

router.get('/user', accountController.user_get);

router.get('/logout', (req, res, next) => {
  req.logout();

  res.sendStatus(200);

  next();
});

module.exports = router;
