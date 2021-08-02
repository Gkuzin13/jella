const SubTask = require('../models/subtask');
const { body, validationResult } = require('express-validator');

exports.create_subtask_post = [
  body('taskName', 'Sub task name must not be empty').isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errorMsg: errors.array() });
    }

    try {
      const newSubTask = await new SubTask({
        _id: req.body._id,
        taskName: req.body.taskName,
        isDone: req.body.isDone,
        position: req.body.position,
        boardId: req.body.boardId,
        cardId: req.body.cardId,
      }).save();

      res.send(newSubTask);
    } catch (error) {
      res.send(error);
    }
  },
];

exports.edit_subtask_patch = [
  body('isDone', 'Must have a value').isBoolean(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.sendStatus(401);
    }

    try {
      const updatedSubTask = await SubTask.findByIdAndUpdate(req.params.id, {
        isDone: req.body.isDone,
      });

      res.send(updatedSubTask);
    } catch (error) {
      res.send(error);
    }
  },
];

exports.subtask_delete = async (req, res) => {
  try {
    await SubTask.findByIdAndDelete(req.params.id);

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
};
