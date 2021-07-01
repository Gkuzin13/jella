import Board from '../models/board.js';
import { body, validationResult } from 'express-validator';
import List from '../models/list.js';
import Card from '../models/card.js';

// Get current board
export const board_get = async (req, res) => {
  // Find selected board by id
  try {
    const board = await Board.findById(req.params.id);

    return res.send({ board_data: board });
  } catch (error) {
    res.send(error);
  }
};

// Get all board's lists and cards  on GET
export const board_all_get = async (req, res) => {
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
export const create_board_post = [
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
        creatorId: '60db6e9aca668a163ab42e6b',
        boardTitle: req.body.boardTitle,
      }).save();

      res.send({ boardData: board });
    } catch (error) {
      res.send({ errorMsg: error });
    }
  },
];

// Handle board delete on DELETE
export const board_delete = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
};

// Handle board upadate on PATCH
export const update_board_patch = [
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
