import { getPriorityIcon } from '../getPriorityIcon';

describe('Should return the correct priority icon', () => {
  test('Should return the correct icon styling', () => {
    expect(getPriorityIcon('low')).toMatchObject({
      color: 'green',
      icon: 'remove',
    });
  });
});
