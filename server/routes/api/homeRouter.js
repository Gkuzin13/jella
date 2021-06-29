import { Router } from 'express';
import {
  create_account_post,
  account_login_post,
} from '../../controllers/accountController.js';
import { checkNotAuthenticated } from '../../middleware/auth.js';
const router = Router();

router.get('/', (req, res) => {
  res.send({ msg: req.user });
});

router.get('/log-in', (req, res) => {
  res.json({ msg: 'Hi' });
});

router.post('/sign-up', checkNotAuthenticated, create_account_post);

router.post('/log-in', checkNotAuthenticated, account_login_post);

export default router;
