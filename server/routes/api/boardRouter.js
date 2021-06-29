import { Router } from 'express';
import {
  create_board_post,
  board_get,
  delete_board_post,
  delete_board_get,
  update_board_put,
} from '../../controllers/boardController.js';
import { create_list_post } from '../../controllers/listController.js';

const router = Router();

router.get('/b/:id', board_get);

router.post('/b/create', create_board_post);

router.get('/b/:id/delete', delete_board_get);

router.post('/b/:id/delete', delete_board_post);

router.put('/b/:id/update', update_board_put);

router.post('/b/:id/createlist', create_list_post);

export default router;
