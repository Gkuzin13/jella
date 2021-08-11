const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const Subtask = require('../models/subtask');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

// Get all user's boards
exports.get_user_boards = async (req, res) => {
  try {
    await Board.find({ creatorId: req.user.id }, (err, data) => {
      if (err) {
        return res.send(err);
      }
      res.send(data);
    });
  } catch (error) {
    res.send(error);
  }
};

// Get selected board lists, cards and subtasks on GET
exports.board_get = async (req, res) => {
  try {
    const boardId = mongoose.Types.ObjectId(req.params.id);
    const board = await Board.aggregate([
      {
        $match: { _id: boardId },
      },
      {
        $lookup: {
          from: 'lists',
          localField: '_id',
          foreignField: 'boardId',
          as: 'lists',
        },
      },
      {
        $lookup: {
          from: 'cards',
          let: { boardId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$boardId', '$$boardId'] } } },
            {
              $lookup: {
                from: 'subtasks',
                let: { cardId: '$_id' },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ['$cardId', '$$cardId'] } },
                  },
                ],
                as: 'subtasks',
              },
            },
          ],
          as: 'cards',
        },
      },
    ]);

    res.send(...board);
  } catch (error) {
    res.send(error);
  }
};

// Create board on POST
exports.create_board_post = [
  // Validate form fields
  body('boardTitle', 'Title must not be empty.').isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }

    // Save new board to db
    try {
      const board = await new Board({
        creatorId: req.user.id,
        boardTitle: req.body.boardTitle,
      }).save();

      res.send(board);
    } catch (error) {
      res.send({ errorMsg: error });
    }
  },
];

// Handle board delete on DELETE
exports.board_delete = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    await List.deleteMany({ boardId: req.params.id });
    await Card.deleteMany({ boardId: req.params.id });
    await Subtask.deleteMany({ boardId: req.params.id });

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
};

// Handle board upadate on PATCH
exports.update_board_patch = [
  // Validate form fields
  body('boardTitle', 'Title must not be empty.').isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errorMsg: errors.array() });
    }

    // Save updated board to db
    try {
      const updatedBoard = await Board.findByIdAndUpdate(
        req.params.id,
        {
          boardTitle: req.body.boardTitle,
        },
        {
          new: true,
        }
      );

      res.send(updatedBoard);
    } catch (error) {
      res.send({ errorMsg: error });
    }
  },
];
