const router = require('express').Router();
const subtaskController = require('../../controllers/subTaskController');
const auth = require('../../middleware/auth');

router.post(
  '/1/checklists/',
  auth.checkAuthenticated,
  subtaskController.create_subtask_post
);

router.put(
  '/1/checklists/:id',
  auth.checkAuthenticated,
  subtaskController.edit_subtask_put
);

router.delete(
  '/1/checklists/:id',
  auth.checkAuthenticated,
  subtaskController.subtask_delete
);

module.exports = router;
