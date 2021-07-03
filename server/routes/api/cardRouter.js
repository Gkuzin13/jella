const router = require('express').Router();
const cardController = require('../../controllers/cardController');

router.get('/1/cards/:id', cardController.card_get);

router.post('/1/cards/', cardController.create_card_post);

router.put('/1/cards/:id', cardController.update_card_put);

router.delete('/1/cards/:id', cardController.card_delete);

module.exports = router;
