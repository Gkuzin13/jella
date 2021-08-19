import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import CardForm from '../CardForm';

describe('CardForm', () => {
  test('Opens and closes card form', () => {
    render(<CardForm />);

    expect(
      screen.queryByPlaceholderText('Enter a title for this card...')
    ).toBeNull();

    fireEvent.click(screen.getByText('Add a card'));

    expect(
      screen.getByPlaceholderText('Enter a title for this card...')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('close'));

    expect(
      screen.queryByPlaceholderText('Enter a title for this card...')
    ).toBeNull();
  });

  test('Submits card form', () => {
    const handleNewCard = jest.fn();

    render(<CardForm handleNewCard={handleNewCard} />);

    fireEvent.click(screen.getByText('Add a card'));

    fireEvent.change(
      screen.getByPlaceholderText('Enter a title for this card...'),
      {
        target: { value: 'Hello' },
      }
    );

    expect(
      screen.getByPlaceholderText('Enter a title for this card...').value
    ).toEqual('Hello');

    fireEvent.click(screen.getByText('Add card'));

    expect(handleNewCard).toBeCalledTimes(1);

    expect(
      screen.queryByPlaceholderText('Enter a title for this card...')
    ).toBeNull();
  });
});
