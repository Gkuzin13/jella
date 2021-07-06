const router = require('express').Router();
const listController = require('../../controllers/listController');
const auth = require('../../middleware/auth');

router.get('/1/lists/:id', auth.checkAuthenticated, listController.list_get);

router.post(
  '/1/lists/',
  auth.checkAuthenticated,
  listController.create_list_post
);

router.patch(
  '/1/lists/:id',
  auth.checkAuthenticated,
  listController.update_list_patch
);

router.delete(
  '/1/lists/:id',
  auth.checkAuthenticated,
  listController.list_delete
);

module.exports = router;
