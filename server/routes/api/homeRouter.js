const router = require('express').Router();
const accountController = require('../../controllers/accountController');
const auth = require('../../middleware/auth');

router.post('/signup', accountController.create_account_post);

router.post(
  '/login',
  accountController.account_login_post,
  accountController.user_get
);

router.get('/user', accountController.user_get);

router.get('/logout', (req, res) => {
  req.logout();

  res.send('logged out');
});

module.exports = router;
