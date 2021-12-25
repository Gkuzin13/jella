const user = {
  id: '1',
  username: 'testUser',
  email: 'testuser@test.com',
};

const board = {
  _id: 'boardId1',
  creatorId: user.id,
  boardTitle: 'Test Board',
  createdAt: Date.now(),
  lists: [
    {
      _id: 'listId1',
      boardId: 'boardId1',
      coverColor: 'blue',
      createdAt: Date.now(),
      listTitle: 'Test List',
      position: 16384,
    },
  ],
  cards: [
    {
      _id: 'cardId1',
      boardId: 'boardId1',
      cardTitle: 'Test Card',
      createdAt: Date.now(),
      description: 'Test Description',
      listId: 'listId1',
      position: 16384,
      priority: 'high',
    },
  ],
};

export { user, board };
