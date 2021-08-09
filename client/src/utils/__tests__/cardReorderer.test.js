import cardReorderer from '../cardReorderer';

describe('Card reorderer', () => {
  it('should reorder cards between lists correctly', () => {
    const mockCards = [
      {
        position: 16384,
        listId: 1,
        draggableId: 123,
      },
      {
        position: 32768,
        listId: 1,
      },
      {
        position: 49152,
        listId: 1,
      },

      {
        position: 16384,
        listId: 2,
      },
      {
        position: 32768,
        listId: 2,
      },
    ];

    const expectedArr = [
      {
        position: 32768,
        listId: 1,
      },
      {
        position: 49152,
        listId: 1,
      },

      {
        position: 16384,
        listId: 2,
      },
      {
        position: 24576,
        listId: 2,
      },
      {
        position: 32768,
        listId: 2,
      },
    ];
    const destination = {
      index: 1,
      droppableId: 2,
    };
    const source = {
      index: 0,
      droppableId: 1,
    };
    expect(cardReorderer(mockCards, destination, source, 123).allCards).toEqual(
      expectedArr
    );
  });
});
