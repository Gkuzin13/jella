const List = require('../models/list');
const Card = require('../models/card');
const { body, validationResult } = require('express-validator');
const recalcItemsPos = require('../utils/recalcPos');

// Handle get list on GET
exports.list_get = async (req, res) => {
  // Find list by id
  try {
    const list = await List.findById(req.params.id);

    res.send(list);
  } catch (error) {
    res.send(error);
  }
};

// Handle create new list on POST
exports.create_list_post = [
  // Validate form field
  body('listTitle', 'Title must not be empty.').isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errorMsg: errors.array() });
    }

    try {
      // Create new list object
      const newList = await new List({
        _id: req.body._id,
        listTitle: req.body.listTitle,
        boardId: req.body.boardId,
        position: req.body.position,
      }).save();

      res.send(newList);
    } catch (error) {
      res.send(error);
    }
  },
];

// Handle list update on PUT
exports.update_list_put = [
  // Validate form fields
  body('listTitle', 'Title must not be empty.').isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }

    try {
      const newPos = req.body.position;
      // Find list by id and update
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        {
          listTitle: req.body.listTitle,
          position: req.body.position,
        },
        {
          new: true,
        }
      );

      // Check if list pos is less than 0.1
      if (!Number.isInteger(newPos) && newPos % 1 < 0.1) {
        const boardId = req.body.boardId;
        await recalcItemsPos({ boardId: boardId }, List);
        return;
      }

      res.send(updatedList);
    } catch (error) {
      res.send(error);
    }
  },
];

// Handle list delete
exports.list_delete = async (req, res) => {
  try {
    // Find and delete list by Id
    await List.findByIdAndDelete(req.params.id);

    // find and delete all cards with list id
    await Card.deleteMany({ listId: req.params.id });

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
};
