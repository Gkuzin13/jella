const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const Subtask = require('../models/subtask');
const { Types } = require('mongoose');
const { body, validationResult } = require('express-validator');

// Get all user's boards
exports.get_user_boards = async (req, res) => {
  try {
    const userId = Types.ObjectId(req.user.id);
    const boards = await Board.find({ creatorId: userId });

    res.send(boards);
  } catch (error) {
    res.sendStatus(404);
  }
};

// Get selected board lists, cards and subtasks on GET
exports.board_get = async (req, res) => {
  try {
    const boardId = Types.ObjectId(req.params.id);

    const board = await Board.aggregate([
      {
        $match: { _id: boardId, creatorId: req.user.id },
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

    if (!board.length) {
      return res.sendStatus(404);
    }

    res.send(...board);
  } catch (error) {
    res.sendStatus(404);
  }
};

// Create board on POST
exports.create_board_post = [
  // Validate form fields
  body('boardTitle', 'Title must not be empty.').isLength({ min: 1, max: 64 }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ error: errors.array({ onlyFirstError: true })[0].msg });
    }

    // Save new board to db
    try {
      const board = await Board.create({
        creatorId: req.user.id,
        boardTitle: req.body.boardTitle,
      });

      res.send(board);
    } catch (error) {
      res.send({ errorMsg: error });
    }
  },
];

// Handle board delete on DELETE
exports.board_delete = async (req, res) => {
  try {
    const boardId = req.params.id;

    const deletedBoard = await Board.findOneAndDelete({
      _id: boardId,
      creatorId: req.user.id,
    });

    if (!deletedBoard) {
      return res.sendStatus(404);
    }

    await List.deleteMany({ boardId });
    await Card.deleteMany({ boardId });
    await Subtask.deleteMany({ boardId });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};

// Handle board upadate on PATCH
exports.update_board_patch = [
  // Validate form fields
  body('boardTitle', 'Title must not be empty.').isLength({ min: 1, max: 64 }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ error: errors.array({ onlyFirstError: true })[0].msg });
    }

    // Save updated board to db
    try {
      const boardId = req.params.id;
      const updatedBoard = await Board.findOneAndUpdate(
        { _id: boardId, creatorId: req.user.id },
        {
          boardTitle: req.body.boardTitle,
        },
        {
          new: true,
        }
      );

      if (!updatedBoard) {
        return res.sendStatus(404);
      }

      res.send(updatedBoard);
    } catch (error) {
      res.send({ errorMsg: error });
    }
  },
];
