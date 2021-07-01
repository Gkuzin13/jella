import { Router } from 'express';
import {
  create_board_post,
  board_get,
  board_delete,
  update_board_patch,
} from '../../controllers/boardController.js';

const router = Router();

router.get('/b/:id', board_get);

router.post('/b/create', create_board_post);

router.patch('/b/:id/update', update_board_patch);

router.delete('/b/:id/delete', board_delete);

export default router;
