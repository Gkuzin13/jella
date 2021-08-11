const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const mongoose = require('mongoose');

exports.populateGuestBoard = async (userId) => {
  const boardId = mongoose.Types.ObjectId().toHexString();

  const guestBoard = {
    _id: boardId,
    creatorId: userId,
    boardTitle: 'Main Board',
  };

  const guestLists = [
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      listTitle: 'Backlog',
      position: 16384,
      coverColor: 'gray',
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      listTitle: 'Planned',
      position: 32768,
      coverColor: 'blue',
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      listTitle: 'In Progress',
      position: 49152,
      coverColor: 'purple',
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      listTitle: 'Completed',
      position: 65536,
      coverColor: 'green',
      boardId: boardId,
    },
  ];

  const guestCards = [
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      cardTitle: 'Welcome to Company',
      description: 'Company is a bla bla',
      priority: 'low',
      position: 16384,
      listId: guestLists[0]._id,
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      cardTitle: 'You can add lists',
      description:
        'A list is a collection of vertically-arranged cards. They may represent a collection of ideas, things to remember, or different stages of a workflow.',
      priority: 'medium',
      position: 32768,
      listId: guestLists[0]._id,
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      cardTitle: 'And add detailed description to cards',
      description: 'Just like this!',
      priority: 'low',
      position: 49152,
      listId: guestLists[0]._id,
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      cardTitle: 'Break big tasks into smaller actionable steps',
      description:
        'A checklist is a way of keeping track of subtasks within a card.',
      priority: 'medium',
      position: 16384,
      listId: guestLists[1]._id,
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      cardTitle: 'Try to rearrange lists and cards',
      description: '',
      priority: 'medium',
      position: 16384,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      cardTitle: 'You can set three diffrent levels of priority',
      description: '',
      priority: 'high',
      position: 32768,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      cardTitle: 'And add detailed description to cards',
      description: 'Just like this!',
      priority: 'low',
      position: 49152,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: mongoose.Types.ObjectId().toHexString(),
      cardTitle: 'How do you like it?',
      description: '',
      priority: 'low',
      position: 16384,
      listId: guestLists[3]._id,
      boardId: boardId,
    },
  ];

  try {
    await new Board(guestBoard).save();

    await List.insertMany(guestLists, (err, docs) => {
      if (err) return console.log(err);
      console.log(docs);
    });

    await Card.insertMany(guestCards, (err, docs) => {
      if (err) return console.log(err);
      console.log(docs);
    });
  } catch (error) {
    return error;
  }
};
