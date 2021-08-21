import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import CardDetailsBox from '../CardDetailsBox';

const props = {
  cards: [{ _id: '2', listId: '1' }],
  lists: [{ _id: '1' }],
  cardBox: { cardId: '2', isOpen: true },
};

describe('CardDetailsBox', () => {
  test('should close details box', () => {
    const toggleCardBox = jest.fn();

    render(<CardDetailsBox {...props} toggleCardBox={toggleCardBox} />);

    fireEvent.click(screen.getByText(/close/).closest('button'));

    expect(toggleCardBox).toBeCalledTimes(1);
  });

  test('should trigger card delete', () => {
    const dispatchCards = jest.fn();
    const toggleCardBox = jest.fn();

    render(
      <CardDetailsBox
        {...props}
        dispatchCards={dispatchCards}
        toggleCardBox={toggleCardBox}
      />
    );

    fireEvent.click(screen.getByText(/Delete/).closest('button'));

    expect(dispatchCards).toBeCalledTimes(1);
    expect(toggleCardBox).toBeCalledTimes(1);
  });
});
