import listReorderer from '../listReorderer';

describe('List Reorderer', () => {
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
    expect(listReorderer(mockLists, destination, source).updatedLists).toEqual(
      expectedArr
    );
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

    expect(listReorderer(mockLists, destination, source).updatedLists).toEqual(
      expectedArr
    );
  });
});
