const db = require('../testDb');
const { Types } = require('mongoose');
const Card = require('../../models/card');
const recalcItemsPos = require('../recalcItemsPos');

const boardId = Types.ObjectId().toHexString();
const listId = Types.ObjectId().toHexString();

const mockCards = [
  {
    cardTitle: '1',
    position: 8192,
    listId: listId,
    boardId: boardId,
  },
  {
    cardTitle: '2',
    position: 20480.01,
    listId: listId,
    boardId: boardId,
  },
  {
    cardTitle: '3',
    position: 32768.512,
    listId: listId,
    boardId: boardId,
  },
  {
    cardTitle: '4',
    position: 49602,
    listId: listId,
    boardId: boardId,
  },
  {
    cardTitle: '5',
    position: 52382.128,
    listId: listId,
    boardId: boardId,
  },
];

beforeAll(async () => await db.connect());

afterEach(async () => await db.clearDatabase());

afterAll(async () => await db.closeDatabase());

describe('recalItemsPos', () => {
  it('should correctly set new positions to cards', async () => {
    // Insert mock lists to db
    await Card.insertMany(mockCards);

    // Run the function to set new positions
    await recalcItemsPos({ listId }, Card);

    // Get updated lists from db
    const cards = await Card.find({});

    // expect positions to be set correctly
    expect(cards[0].position).toEqual(16384);
    expect(cards[1].position).toEqual(32768);
    expect(cards[2].position).toEqual(49152);
    expect(cards[3].position).toEqual(65536);
    expect(cards[4].position).toEqual(81920);

    expect(cards.length).toEqual(5);
  });
});
