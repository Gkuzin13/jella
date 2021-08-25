import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ListOptionsBox from '../ListOptionsBox';

const props = {
  listData: {
    _id: '1',
    coverColor: 'gray',
  },
};

describe('ListActionsBox', () => {
  test('should close actions box', () => {
    const toggleOptionsBox = jest.fn();
    render(<ListOptionsBox {...props} toggleOptionsBox={toggleOptionsBox} />);

    fireEvent.click(screen.getByText(/close/).closest('button'));

    expect(toggleOptionsBox).toBeCalledTimes(1);
  });

  test('should change list color correctly', async () => {
    const toggleOptionsBox = jest.fn();
    const handleListUpdate = jest.fn();
    render(
      <ListOptionsBox
        {...props}
        toggleOptionsBox={toggleOptionsBox}
        handleListUpdate={handleListUpdate}
      />
    );

    userEvent.click(
      await screen.findByLabelText(/Select blue list cover color/)
    );

    expect(handleListUpdate).toBeCalledTimes(1);
  });
});
