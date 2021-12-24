const router = require('express').Router();
const accountController = require('../../controllers/accountController');
const auth = require('../../middleware/auth');

router.post(
  '/signup',
  accountController.create_account_post,
  accountController.account_login_post
);

router.post('/login', accountController.account_login_post);

router.post(
  '/login/guest',
  accountController.create_guest_account,
  accountController.account_login_post
);

router.get('/user', accountController.user_get);

router.post('/logout', accountController.account_logout);

module.exports = router;
