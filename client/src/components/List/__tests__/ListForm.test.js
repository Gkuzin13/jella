import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import ListForm from '../ListForm';

describe('ListForm', () => {
  test('Opens and closes list form', async () => {
    render(<ListForm />);

    fireEvent.click(screen.getByRole('button'));

    await expect(
      screen.getByPlaceholderText('Enter a title for this list...')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('close').closest('button'));

    await expect(
      screen.queryByPlaceholderText('Enter a title for this list...')
    ).toBeNull();
  });

  test('Submits list form', async () => {
    const handleNewList = jest.fn();
    render(<ListForm handleNewList={handleNewList} />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.change(
      screen.getByPlaceholderText('Enter a title for this list...'),
      {
        target: { value: 'Hello' },
      }
    );

    expect(
      screen.getByPlaceholderText('Enter a title for this list...').value
    ).toEqual('Hello');

    fireEvent.click(screen.getByText('Add list'));

    expect(handleNewList).toBeCalledTimes(1);

    expect(
      screen.queryByPlaceholderText('Enter a title for this list...')
    ).toBeNull();
  });
});
