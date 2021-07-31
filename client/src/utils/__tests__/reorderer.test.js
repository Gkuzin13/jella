const reorderer = require('../reorderer');

const mockItems = [
  {
    position: 1024,
  },
  {
    position: 2048,
  },
  {
    position: 3072,
  },
];

test('should append new item correctly', () => {
  expect(reorderer.appendItem(mockItems)).toBe(4096);
});

test('should append new item if array is empty', () => {
  expect(reorderer.appendItem([])).toBe(16384);
});

test('should prepend item correctly', () => {
  expect(reorderer.prependItem(mockItems)).toBe(512);
});

test('should insert item in middle correctly', () => {
  expect(
    reorderer.insertItem(mockItems[0].position, mockItems[1].position)
  ).toBe(1536);

  expect(
    reorderer.insertItem(mockItems[1].position, mockItems[2].position)
  ).toBe(2560);
});
