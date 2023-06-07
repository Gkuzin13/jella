import { fireEvent, render, screen } from '@testing-library/react';
import mockDnD from '../../../utils/testUtils';

import Subtask from '../Subtask';

(() => mockDnD)();

const props = {
  subtask: {
    _id: '1',
    taskName: 'test',
    isDone: false,
  },
  snapshot: {
    draggingFromThisWith: '1',
  },
  index: 0,
};

describe('Subtask', () => {
  test('should check subtask', () => {
    const handleSubtaskUpdate = jest.fn();
    render(<Subtask handleSubtaskUpdate={handleSubtaskUpdate} {...props} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByLabelText('test')).toBeChecked();

    expect(handleSubtaskUpdate).toBeCalledTimes(1);
  });

  test('should delete subtask', () => {
    const handleSubtaskDelete = jest.fn();
    render(<Subtask handleSubtaskDelete={handleSubtaskDelete} {...props} />);

    fireEvent.click(screen.getByText(/close/));

    expect(handleSubtaskDelete).toBeCalledTimes(1);
  });
});
