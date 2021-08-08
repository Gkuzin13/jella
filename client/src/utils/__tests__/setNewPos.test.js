import { setNewPos } from '../setNewPos';

const mockItems = [
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

describe('Should set new position correctly', () => {
  test('Should prepend item correctly', () => {
    const destination = {
      index: 0,
    };
    expect(setNewPos(mockItems, destination)).toBe(8192);
  });

  test('Should insert item in the middle correctly', () => {
    const destination = {
      index: 1,
    };

    expect(setNewPos(mockItems, destination)).toBe(32768);
  });
  test('Should append item correctly', () => {
    const destination = {
      index: 2,
    };

    expect(setNewPos(mockItems, destination)).toBe(65536);
  });
});
