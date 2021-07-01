import Card from '../models/card.js';
import Board from '../models/board.js';
import { body, validationResult } from 'express-validator';
import List from '../models/list.js';

// Handle create card on post
export const create_card_post = [
  body('cardTitle', 'Title must not be empty').isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }

    try {
      const newCard = new Card({
        cardTitle: req.body.cardTitle,
        description: req.body.description,
        cardColor: '',
      });

      const card = await Board.findByIdAndUpdate(
        '60db9143a480253f6a3e421c',
        {
          $push: { 'lists.$[e1].cards': newCard },
        },
        {
          arrayFilters: [{ 'e1._id': '60db91989f02403ffc87c6ec' }],
          new: true,
        }
      );

      res.send(card);
    } catch (error) {
      res.status(error).send(body);
    }
  },
];
