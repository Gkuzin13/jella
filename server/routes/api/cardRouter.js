import { Router } from 'express';
import {
  card_delete,
  card_get,
  create_card_post,
  update_card_put,
} from '../../controllers/cardController.js';

const router = Router();

router.get('/1/cards/:id', card_get);

router.post('/1/cards/create', create_card_post);

router.put('/1/cards/:id', update_card_put);

router.delete('/1/cards/:id', card_delete);

export default router;
