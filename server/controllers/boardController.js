import Board from '../models/board.js';
import { body, validationResult } from 'express-validator';

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
        board_creator: '60db6e9aca668a163ab42e6b',
        boardTitle: req.body.boardTitle,
      }).save();

      res.redirect(`/b/${board._id}`);
    } catch (error) {
      res.send({ errorMsg: error });
    }
  },
];

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

// Get current board
export const delete_board_get = (req, res) => {
  res.send({ msg: req.params.id });
};

// Handle board delete on post
export const delete_board_post = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);

    res.redirect(`/${req.user.id}/home`);
  } catch (error) {
    res.send(error);
  }
};

// Handle board upadate on PUT
export const update_board_put = [
  // Validate form fields
  body('boardTitle', 'Title must not be empty.').isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errorMsg: errors.array() });
    }

    // Save updated board to db
    try {
      await Board.findByIdAndUpdate(req.params.id, {
        title: req.body.boardTitle,
      });

      res.send({ msg: 'updated!' });
    } catch (error) {
      res.send({ errorMsg: error });
    }
  },
];
