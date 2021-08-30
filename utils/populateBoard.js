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
    boardTitle: 'Intro Board',
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
      cardTitle: 'Welcome to Jella!',
      description: 'Jella is a powerful tool to visually manage your workflow.',
      priority: 'low',
      position: 16384,
      listId: guestLists[0]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'You can easily add new lists and cards.',
      description:
        'A list is a collection of vertically-arranged cards. They may represent a collection of ideas, things to remember, or different stages of a workflow.',
      priority: 'medium',
      position: 32768,
      listId: guestLists[0]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'Rearrange lists and cards by dragging them around.',
      description: 'You can also move cards between diffrent lists.',
      priority: 'high',
      position: 49152,
      listId: guestLists[0]._id,
      boardId: boardId,
    },

    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'Open list options by clicking on the three dots.',
      description: '',
      priority: 'medium',
      position: 16384,
      listId: guestLists[1]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'Set three diffrent levels of priority in a card.',
      description: '',
      priority: 'high',
      position: 16384,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'Add descriptions to cards.',
      description: '',
      priority: 'low',
      position: 32768,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle:
        'Break large tasks down into smaller, more manageable pieces with the help of a checklist.',
      description:
        'A checklist is a way of keeping track of subtasks within a card.',
      priority: 'medium',
      position: 49152,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'Rename lists and cards by clicking on the text of the title.',
      description: '',
      priority: 'low',
      position: 65536,
      listId: guestLists[2]._id,
      boardId: boardId,
    },
    {
      _id: Types.ObjectId().toHexString(),
      cardTitle: 'Hope you like it!',
      description: '.',
      priority: 'high',
      position: 16384,
      listId: guestLists[3]._id,
      boardId: boardId,
    },
  ];

  const guestSubtasks = [
    {
      taskName: 'Add a new list',
      isDone: true,
      position: 16384,
      cardId: guestCards[1]._id,
      boardId: boardId,
    },
    {
      taskName: 'Add a new card',
      isDone: false,
      position: 32768,
      cardId: guestCards[1]._id,
      boardId: boardId,
    },
    {
      taskName: 'Rearrange lists',
      isDone: false,
      position: 16384,
      cardId: guestCards[2]._id,
      boardId: boardId,
    },
    {
      taskName: 'Rearrange cards between different lists',
      isDone: false,
      position: 32768,
      cardId: guestCards[2]._id,
      boardId: boardId,
    },
    {
      taskName: 'Change color of a list',
      isDone: false,
      position: 16384,
      cardId: guestCards[3]._id,
      boardId: boardId,
    },
    {
      taskName: 'Add a description to this card',
      isDone: false,
      position: 16384,
      cardId: guestCards[5]._id,
      boardId: boardId,
    },
    {
      taskName: 'Try rearranging checklist items by dragging them around',
      isDone: false,
      position: 8192,
      cardId: guestCards[6]._id,
      boardId: boardId,
    },
    {
      taskName: 'Some task',
      isDone: true,
      position: 16384,
      cardId: guestCards[6]._id,
      boardId: boardId,
    },
    {
      taskName: 'Some other task',
      isDone: true,
      position: 32768,
      cardId: guestCards[6]._id,
      boardId: boardId,
    },
    {
      taskName: 'Another task',
      isDone: true,
      position: 49152,
      cardId: guestCards[6]._id,
      boardId: boardId,
    },
    {
      taskName: 'Rename a list',
      isDone: false,
      position: 16384,
      cardId: guestCards[7]._id,
      boardId: boardId,
    },
    {
      taskName: 'Rename this card',
      isDone: false,
      position: 32768,
      cardId: guestCards[7]._id,
      boardId: boardId,
    },
    {
      taskName: 'Example subtask',
      isDone: true,
      position: 16384,
      cardId: guestCards[8]._id,
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
