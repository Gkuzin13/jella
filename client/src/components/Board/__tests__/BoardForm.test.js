import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import BoardForm from '../BoardForm';

describe('BoardForm', () => {
  test('should open and close modal correctly', async () => {
    render(<BoardForm />);

    fireEvent.click(screen.getByText(/Create new board/));

    expect(
      screen.getByPlaceholderText(/Enter a title for this board.../)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/close/).closest('button'));

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText(/Enter a title for this board.../)
      ).toBeNull();
    });
  });

  test('should create new board', async () => {
    const handleNewBoard = jest.fn();
    render(<BoardForm handleNewBoard={handleNewBoard} />);

    fireEvent.click(screen.getByText(/Create new board/));

    expect(
      screen.getByPlaceholderText(/Enter a title for this board.../)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Create board/));

    await waitFor(() => {
      expect(handleNewBoard).toBeCalledTimes(1);
    });
  });
});
