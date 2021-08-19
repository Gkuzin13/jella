import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import BoardForm from '../BoardForm';

describe('BoardForm', () => {
  test('Submits board form', () => {
    const handleNewBoard = jest.fn();
    render(<BoardForm handleNewBoard={handleNewBoard} />);

    fireEvent.change(
      screen.getByPlaceholderText('Enter a title for this board...'),
      {
        target: { value: 'Hello' },
      }
    );

    expect(
      screen.getByPlaceholderText('Enter a title for this board...').value
    ).toEqual('Hello');

    fireEvent.click(screen.getByRole('button'));

    expect(handleNewBoard).toBeCalledTimes(1);
  });
});
