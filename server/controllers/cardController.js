const Card = require('../models/card');
const { body, validationResult } = require('express-validator');
const isTooClose = require('../utils/isTooClose');
const recalcItemsPos = require('../utils/recalcItemsPos');

// Handle current card GET
exports.card_get = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    res.send(card);
  } catch (error) {
    res.send(error);
  }
};

// Handle create card on post
exports.create_card_post = [
  body('cardTitle', 'Title must not be empty').isLength({ min: 1, max: 40 }),
  body('position', 'Card position must be a number').isNumeric(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }

    try {
      const newCard = await new Card({
        _id: req.body._id,
        cardTitle: req.body.cardTitle,
        position: req.body.position,
        listId: req.body.listId,
        boardId: req.body.boardId,
      }).save();

      res.send(newCard);
    } catch (error) {
      res.send(error);
    }
  },
];

// Handle card update on PUT
exports.update_card_put = [
  body('cardTitle', 'Title must not be empty').isLength({ min: 1, max: 40 }),
  body('position', 'Card position must be a number').isNumeric(),
  body('priority', 'Title must not be empty').isString(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ error: errors.array({ onlyFirstError: true })[0] });
    }

    try {
      const newPos = req.body.position;
      const updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        {
          cardTitle: req.body.cardTitle,
          description: req.body.description,
          coverColor: req.body.coverColor,
          position: newPos,
          priority: req.body.priority,
          listId: req.body.listId,
        },
        {
          new: true,
        }
      );

      // Sets new positions if the new pos of the card is too close to neighbouring cards
      if (isTooClose(newPos)) {
        const listId = req.body.listId;
        const cards = await recalcItemsPos({ listId }, Card);

        return res.send(cards);
      }

      res.send(updatedCard);
    } catch (error) {
      res.send(error);
    }
  },
];

// Handle card delete on DELETE
exports.card_delete = async (req, res) => {
  try {
    await Card.findByIdAndRemove(req.params.id);

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
};
