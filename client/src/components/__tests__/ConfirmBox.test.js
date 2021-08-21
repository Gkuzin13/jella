import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';

import ConfirmBox from '../ConfirmBox';

const props = {
  confirmBox: { id: '1', isOpen: true },
};

describe('ConfirmBox', () => {
  test('should close modal box', () => {
    const setConfirmBox = jest.fn();

    render(<ConfirmBox setConfirmBox={setConfirmBox} {...props} />);

    expect(screen.getByText(/close/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/close/));

    expect(setConfirmBox).toBeCalledTimes(1);
  });

  test('should call handle function correctly', async () => {
    const handleFunc = jest.fn();
    const setConfirmBox = jest.fn();

    render(
      <ConfirmBox
        handleFunc={handleFunc}
        setConfirmBox={setConfirmBox}
        {...props}
      />
    );

    expect(screen.getByText(/Yes, i'm sure/)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText(/Yes, i'm sure/));
    });
    expect(handleFunc).toBeCalledTimes(1);
  });
});
