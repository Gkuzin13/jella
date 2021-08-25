const router = require('express').Router();
const boardController = require('../../controllers/boardController');
const auth = require('../../middleware/auth');

router.get('/b/:id', auth.checkAuthenticated, boardController.board_get);

router.get(
  '/:userId/boards',
  auth.checkAuthenticated,
  boardController.get_user_boards
);

router.post('/b/', auth.checkAuthenticated, boardController.create_board_post);

router.patch(
  '/b/:id/',
  auth.checkAuthenticated,
  boardController.update_board_patch
);

router.delete('/b/:id/', auth.checkAuthenticated, boardController.board_delete);

module.exports = router;
