import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ListActionsBox from '../ListActionsBox';

const props = {
  listData: {
    _id: '1',
    coverColor: 'gray',
  },
};

describe('ListActionsBox', () => {
  test('should close actions box', () => {
    const toggleActionsBox = jest.fn();
    render(<ListActionsBox {...props} toggleActionsBox={toggleActionsBox} />);

    fireEvent.click(screen.getByText(/close/).closest('button'));

    expect(toggleActionsBox).toBeCalledTimes(1);
  });

  test('should change list color correctly', async () => {
    const toggleActionsBox = jest.fn();
    const handleListUpdate = jest.fn();
    render(
      <ListActionsBox
        {...props}
        toggleActionsBox={toggleActionsBox}
        handleListUpdate={handleListUpdate}
      />
    );

    userEvent.click(
      await screen.findByLabelText(/Select blue list cover color/)
    );

    expect(handleListUpdate).toBeCalledTimes(1);
  });
});
