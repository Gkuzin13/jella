const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const Subtask = require('../models/subtask');

const { Types } = require('mongoose');

exports.populateGuestBoard = async (userId) => {
  const boardId = Types.ObjectId().toHexString();

  const guestBoard = {
    _id: boardId,
    creatorId: userId,
    boardTitle: 'Main Board',
  };

  const guestLists = [
    {
      _id: Types.ObjectId().toHexString(),
      listTitle: 'Backlog',
      position: 16384,
      coverColor: 'gray',
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      listTitle: 'Planned',
      position: 32768,
      coverColor: 'blue',
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      listTitle: 'In Progress',
      position: 49152,
      coverColor: 'purple',
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      listTitle: 'Completed',
      position: 65536,
      coverColor: 'green',
      boardId: boardId,
    },
  ];

  const guestCards = [
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'Welcome to Jella',
      description: 'Jella is a powerful tool to visually manage your workflow.',
      priority: 'low',
      position: 16384,
      listId: guestLists[0]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'You can add lists',
      description:
        'A list is a collection of vertically-arranged cards. They may represent a collection of ideas, things to remember, or different stages of a workflow.',
      priority: 'medium',
      position: 32768,
      listId: guestLists[0]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'And add a detailed description to cards',
      description: '',
      priority: 'medium',
      position: 49152,
      listId: guestLists[0]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle:
        'Break big tasks into smaller actionable steps using a checklist',
      description:
        'A checklist is a way of keeping track of subtasks within a card.',
      priority: 'high',
      position: 16384,
      listId: guestLists[1]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'Try to rearrange lists and cards',
      description: '',
      priority: 'medium',
      position: 16384,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'You can set three diffrent levels of priority',
      description: '',
      priority: 'high',
      position: 32768,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'And change the list cover color',
      description: '',
      priority: 'low',
      position: 49152,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'How do you like it?',
      description: '',
      priority: 'low',
      position: 16384,
      listId: guestLists[3]._id,
      boardId: boardId,
    },
  ];

  const guestSubtasks = [
    {
      taskName: 'Add a new list',
      isDone: false,
      position: 16384,
      cardId: guestCards[1]._id,
      boardId: boardId,
    },
    {
      taskName: 'Add a description to this card',
      isDone: false,
      position: 16384,
      cardId: guestCards[2]._id,
      boardId: boardId,
    },
    {
      taskName: 'Check this subtask',
      isDone: false,
      position: 16384,
      cardId: guestCards[3]._id,
      boardId: boardId,
    },
    {
      taskName: 'Already checked',
      isDone: true,
      position: 32768,
      cardId: guestCards[3]._id,
      boardId: boardId,
    },
    {
      taskName: 'Rearrange lists',
      isDone: false,
      position: 16384,
      cardId: guestCards[4]._id,
      boardId: boardId,
    },
    {
      taskName: 'Rearrange cards between different lists',
      isDone: false,
      position: 32768,
      cardId: guestCards[4]._id,
      boardId: boardId,
    },
    {
      taskName: 'Change the priority for this card',
      isDone: false,
      position: 16384,
      cardId: guestCards[5]._id,
      boardId: boardId,
    },
    {
      taskName: 'Change the cover color of this list',
      isDone: false,
      position: 32768,
      cardId: guestCards[6]._id,
      boardId: boardId,
    },
    {
      taskName: 'Some task',
      isDone: true,
      position: 16384,
      cardId: guestCards[7]._id,
      boardId: boardId,
    },
    {
      taskName: 'Some other task',
      isDone: true,
      position: 32768,
      cardId: guestCards[7]._id,
      boardId: boardId,
    },
    {
      taskName: 'Another task',
      isDone: true,
      position: 49152,
      cardId: guestCards[7]._id,
      boardId: boardId,
    },
  ];

  try {
    await new Board(guestBoard).save();

    await List.insertMany(guestLists);

    await Card.insertMany(guestCards);

    await Subtask.insertMany(guestSubtasks);
  } catch (error) {
    console.log(error);
  }
};
