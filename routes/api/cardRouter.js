const router = require('express').Router();
const cardController = require('../../controllers/cardController');
const subtaskController = require('../../controllers/subTaskController');
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

// Card checklist api routes

router.post(
  '/1/cards/:id/checklist',
  auth.checkAuthenticated,
  subtaskController.create_subtask_post
);

router.put(
  '/1/cards/:id/checklist/:idSubtask',
  auth.checkAuthenticated,
  subtaskController.edit_subtask_put
);

router.delete(
  '/1/cards/:id/checklist/:idSubtask',
  auth.checkAuthenticated,
  subtaskController.subtask_delete
);

module.exports = router;
