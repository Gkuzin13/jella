import Board from '../models/board.js';
import List from '../models/list.js';
import { body, validationResult } from 'express-validator';

// Handle new list create on POST
export const create_list_post = [
  // Validate form field
  body('listTitle', 'Title must not be empty.').isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errorMsg: errors.array() });
    }

    try {
      // Find current board and
      let board = await Board.findById('60db9143a480253f6a3e421c');

      board.lists = [
        ...board.lists,
        new List({
          listTitle: req.body.listTitle,
        }),
      ];

      await board.save();

      res.send(board);
    } catch (error) {
      res.send(error);
    }
  },
];
