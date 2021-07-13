const Card = require('../models/card');
const List = require('../models/list');
const { body, validationResult } = require('express-validator');

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
  body('cardTitle', 'Title must not be empty').isLength({ min: 1 }),
  body('position', 'Card position must be a number').isNumeric(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }

    try {
      const newCard = await new Card({
        cardTitle: req.body.cardTitle,
        position: req.body.position,
        listId: req.body.listId,
      }).save();

      await List.findByIdAndUpdate(
        req.body.listId,
        { $push: { cards: newCard._id } },
        { safe: true, upsert: true }
      );

      res.send(newCard);
    } catch (error) {
      res.send(error);
    }
  },
];

// Handle card update on PUT
exports.update_card_put = [
  body('cardTitle', 'Title must not be empty').isLength({ min: 1 }),
  body('position', 'Card position must be a number').isNumeric(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }

    try {
      const updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        {
          cardTitle: req.body.cardTitle,
          description: req.body.description,
          coverColor: req.body.coverColor,
          position: req.body.position,
          listId: req.body.listId,
        },
        {
          new: true,
        }
      );

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
