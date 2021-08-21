import { fireEvent, screen } from '@testing-library/react';

import UserControl from '../UserControl';
import { renderWithContext } from '../../__tests__/App.test';

const userProps = {
  id: '1',
  email: 'test@test.com',
  username: 'Test',
};

describe('UserControl', () => {
  test('should open user control', () => {
    renderWithContext(userProps, UserControl);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Account/)).toBeInTheDocument();
  });

  test('should open and close user control', () => {
    renderWithContext(userProps, UserControl);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Account/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/close/));

    expect(screen.queryByText(/Account/)).toBeNull();
  });
});
