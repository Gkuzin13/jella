import { fireEvent, screen, waitFor } from '@testing-library/react';

import UserControl from '../UserControl';
import { renderWithContext } from '../../__tests__/App.test';

const userProps = {
  id: '1',
  email: 'test@test.com',
  username: 'Test',
};

describe('UserControl', () => {
  test('should open and close user control', async () => {
    renderWithContext(userProps, UserControl);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Hello, /)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/close/));

    await waitFor(() => {
      expect(screen.queryByText(/Hello, /)).toBeNull();
    });
  });
});
