import { Router } from 'express';
import {
  create_list_post,
  list_delete,
  list_get,
  update_list_patch,
} from '../../controllers/listController.js';

const router = Router();

router.get('/1/lists/:id', list_get);

router.post('/1/lists/create', create_list_post);

router.patch('/1/lists/:id', update_list_patch);

router.delete('/1/lists/:id', list_delete);

export default router;
