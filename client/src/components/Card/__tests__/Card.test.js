import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import mockDnD from '../../../utils/testUtils';

import Card from '../Card';

(() => mockDnD)();

const props = {
  cardData: {
    cardTitle: 'test',
    _id: '1',
  },
  index: '1',
};

describe('Card', () => {
  test('should open card details', () => {
    const toggleCardBox = jest.fn();

    render(<Card toggleCardBox={toggleCardBox} {...props} />);

    fireEvent.click(screen.getByText(/test/));

    expect(toggleCardBox).toBeCalledTimes(1);
  });
});
