const Board = require('../models/board');
const List = require('../models/list');
const { body, validationResult } = require('express-validator');

// // Get all user's boards
// exports.board_all_get = async (req,res) => {
//   try {
//     const
//   } catch (error) {
//     res.send(error)
//   }
// }

// Get all selected board lists and cards  on GET
exports.board_get = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    const lists = await List.find({ boardId: req.params.id })
      .populate('cards')
      .exec();

    res.send({ board, lists });
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
        creatorId: req.user,
        boardTitle: req.body.boardTitle,
      }).save();

      res.send({ boardData: board });
    } catch (error) {
      res.send({ errorMsg: error });
    }
  },
];

// Handle board delete on DELETE
exports.board_delete = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);

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
