const SubTask = require('../models/subtask');
const { body, validationResult } = require('express-validator');
const recalcItemsPos = require('../utils/recalcPos');

exports.create_subtask_post = [
  body('taskName', 'Subtask name must not be empty.').isLength({
    min: 1,
    max: 40,
  }),

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

exports.edit_subtask_put = [
  body('isDone', 'Must have a value').isBoolean(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ error: errors.array({ onlyFirstError: true })[0] });
    }

    try {
      const newPos = req.body.position;
      const updatedSubTask = await SubTask.findByIdAndUpdate(
        req.params.idSubtask,
        {
          taskName: req.body.taskName,
          position: newPos,
          isDone: req.body.isDone,
          cardId: req.body.cardId,
          boardId: req.body.boardId,
        },
        { new: true }
      );

      // Check if subtask pos is less than 0.1
      if (!Number.isInteger(newPos) && newPos % 1 < 0.1) {
        const cardId = req.body.cardId;
        await recalcItemsPos({ cardId }, Subtask);
        return;
      }

      res.send(updatedSubTask);
    } catch (error) {
      res.send(error);
    }
  },
];

exports.subtask_delete = async (req, res) => {
  try {
    await SubTask.findByIdAndDelete(req.params.idSubtask);

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
};
