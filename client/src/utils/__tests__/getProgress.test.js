import {
  calcPercentage,
  getProgressColor,
  calcTasksStats,
} from '../getProgress';

const mockSubtasks = [
  {
    isDone: false,
  },
  {
    isDone: true,
  },
  {
    isDone: true,
  },
  {
    isDone: true,
  },
  {
    isDone: false,
  },
];

describe('Should show progress correctly', () => {
  test('Should calc percentage done correctly', () => {
    expect(calcPercentage(3, 5)).toBe(60);
  });

  test('Should calc split done and total tasks', () => {
    expect(calcTasksStats(mockSubtasks)).toMatchObject({ total: 5, done: 3 });
  });

  test('Should return blue tailwind bg color', () => {
    expect(getProgressColor(5, 3)).toBe('bg-blue-100 text-blue-700');
  });
  test('Should return gray tailwind bg color', () => {
    expect(getProgressColor(5, 0)).toBe('bg-gray-100 text-gray-600');
  });
  test('Should return green tailwind bg color', () => {
    expect(getProgressColor(5, 5)).toBe('bg-green-100 text-green-700');
  });
});
