const router = require('express').Router();
const cardController = require('../../controllers/cardController');
const auth = require('../../middleware/auth');

router.get('/1/cards/:id', auth.checkAuthenticated, cardController.card_get);

router.post(
  '/1/cards/',
  auth.checkAuthenticated,
  cardController.create_card_post
);

router.put(
  '/1/cards/:id',
  auth.checkAuthenticated,
  cardController.update_card_put
);

router.delete(
  '/1/cards/:id',
  auth.checkAuthenticated,
  cardController.card_delete
);

module.exports = router;
