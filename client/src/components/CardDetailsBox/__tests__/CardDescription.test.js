import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import CardDescription from '../CardDescription';

describe('Card Description', () => {
  test('Opens description form correctly if no value', async () => {
    render(<CardDescription selectedCard={{ description: '' }} />);

    expect(
      screen.getByText('Add a description to this card...')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    await expect(
      screen.getByPlaceholderText('Add a description to this card...')
    ).toBeInTheDocument();
  });

  test('Opens description form correctly if has value', async () => {
    render(<CardDescription selectedCard={{ description: 'Description' }} />);

    fireEvent.click(screen.getByRole('button'));

    await expect(screen.getByDisplayValue('Description')).toBeInTheDocument();
  });

  test('Submits description form', async () => {
    const handleCardUpdate = jest.fn();
    render(
      <CardDescription
        handleCardUpdate={handleCardUpdate}
        selectedCard={{ description: '' }}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    fireEvent.change(
      screen.getByPlaceholderText('Add a description to this card...'),
      {
        target: { value: 'Hello' },
      }
    );

    await expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.queryByText('Save')).toBeNull();
    expect(handleCardUpdate).toBeCalledTimes(1);
  });
});
