import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from '../App';
import { AuthContext } from '../config/Auth';

export const renderWithRouter = (user, history) => {
  const userProps = {
    isLoading: false,
    user: user,
  };
  return render(
    <AuthContext.Provider value={{ ...userProps }}>
      <Router history={history}>
        <App></App>
      </Router>
    </AuthContext.Provider>
  );
};

export const renderWithContext = (user, Component) => {
  const userProps = {
    isLoading: false,
    user,
  };
  return render(
    <AuthContext.Provider value={{ ...userProps }}>
      <Component></Component>
    </AuthContext.Provider>
  );
};

describe('App', () => {
  test('render landing page and nav to login', () => {
    const history = createMemoryHistory();

    renderWithRouter(null, history);

    expect(screen.getByText(/Try It Out/)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Log In/));

    expect(screen.getByText(/Log in to your account/)).toBeInTheDocument();
  });

  test('render landing page and nav to sign up', () => {
    const history = createMemoryHistory();

    renderWithRouter(null, history);

    expect(screen.getByText(/Try It Out/)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Sign Up/));

    expect(screen.getByText(/Sign up for your account/)).toBeInTheDocument();
  });

  test('redirects to page not found correctly', () => {
    const history = createMemoryHistory();
    history.push('/non-match-route');

    renderWithRouter(null, history);

    expect(screen.getByText(/Page not found/)).toBeInTheDocument();
  });
});
