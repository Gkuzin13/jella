import { reorderItemsBetweenLists, reorderItems } from '../reorder';

describe('reorderItemBetweenLists', () => {
  it('should reorder cards between lists correctly', () => {
    const mockCards = [
      {
        position: 16384,
        listId: 1,
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

    const source = {
      index: 0,
      droppableId: 1,
    };

    const destination = {
      index: 1,
      droppableId: 2,
    };

    expect(
      reorderItemsBetweenLists(mockCards, destination, source, 123)
    ).toEqual(expectedArr);
  });
});

describe('reorderItems', () => {
  it('should reorder lists correctly', () => {
    const mockLists = [
      {
        position: 16384,
      },
      {
        position: 32768,
      },
      {
        position: 49152,
      },
      {
        position: 65536,
      },
    ];
    const expectedArr = [
      {
        position: 16384,
      },
      {
        position: 32768,
      },
      {
        position: 40960,
      },
      {
        position: 49152,
      },
    ];

    const destination = {
      index: 2,
    };

    const source = {
      index: 3,
    };

    expect(reorderItems(mockLists, destination, source)).toEqual(expectedArr);
  });

  it('should recalc lists pos if it gets too close to neighbours (< 0.1)', () => {
    const mockLists = [
      {
        position: 8192,
      },
      {
        position: 32768.001,
      },
      {
        position: 65536,
      },
    ];

    const expectedArr = [
      {
        position: 16384,
      },
      {
        position: 32768,
      },
      {
        position: 49152,
      },
    ];

    const destination = {
      index: 1,
    };

    const source = {
      index: 0,
    };

    expect(reorderItems(mockLists, destination, source)).toEqual(expectedArr);
  });
});
