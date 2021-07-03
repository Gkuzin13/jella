const List = require('../models/list');
const { body, validationResult } = require('express-validator');

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
      return res.send({ errorMsg: errors.array() });
    }

    try {
      // Create new list object
      const newList = await new List({
        listTitle: req.body.listTitle,
        boardId: req.body.boardId,
      }).save();

      res.send(newList);
    } catch (error) {
      res.send(error);
    }
  },
];

// Handle list update on PATCH
exports.update_list_patch = [
  // Validate form fields
  body('listTitle', 'Title must not be empty.').isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    }

    try {
      // Find current board and push new list to db
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        {
          listTitle: req.body.listTitle,
        },
        {
          new: true,
        }
      );

      res.send(updatedList);
    } catch (error) {
      res.send(error);
    }
  },
];

// Handle list delete
exports.list_delete = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);

    res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
};
