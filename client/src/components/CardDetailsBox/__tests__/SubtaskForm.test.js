import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SubTaskForm from '../SubtaskForm';

describe('SubtaskForm', () => {
  test('opens subtask form', async () => {
    render(<SubTaskForm />);

    expect(screen.queryByPlaceholderText('Add an item')).toBeNull();

    fireEvent.click(screen.getByRole('button'));

    expect(
      await screen.findByPlaceholderText('Add an item')
    ).toBeInTheDocument();
  });

  test('submits subtask form', async () => {
    const handleNewSubtask = jest.fn();

    render(<SubTaskForm handleNewSubtask={handleNewSubtask} />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.change(screen.getByPlaceholderText('Add an item'), {
      target: { value: 'Item 1' },
    });

    expect(screen.getByDisplayValue('Item 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add'));

    expect(handleNewSubtask).toHaveBeenCalledTimes(1);

    expect(screen.queryByPlaceholderText('Add an item')).toBeNull();
  });
});
