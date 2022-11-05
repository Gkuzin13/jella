import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { AuthContext } from "../config/Auth";
import { board, user } from "../mocks/mockData";
import BoardPage from "../pages/BoardPage";
import Home from "../pages/Home";

export const renderWithRouter = (user, history) => {
  const userProps = {
    isLoading: false,
    user,
  };
  return render(
    <AuthContext.Provider value={{ ...userProps }}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export const renderWithContext = (user, Component, history) => {
  const userProps = {
    isLoading: false,
    user,
  };
  return render(
    <AuthContext.Provider value={{ ...userProps }}>
      <BrowserRouter history={history}>
        <Component />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("App", () => {
  test("render landing page", () => {
    const history = window.location;
    renderWithRouter(null, history);

    expect(screen.getByText(/Try It Out/)).toBeInTheDocument();
  });

  test("render login page", async () => {
    const history = window.history.replaceState({}, "", "/login");
    renderWithRouter(null, history);

    await waitFor(() =>
      expect(screen.getByText(/Log in to your account/)).toBeInTheDocument()
    );
  });

  test("render render signup page", async () => {
    const history = window.history.replaceState({}, "", "/signup");
    renderWithRouter(null, history);

    await waitFor(() =>
      expect(screen.getByText(/Sign up for your account/)).toBeInTheDocument()
    );
  });

  test("render home page correctly", async () => {
    const history = window.history.replaceState({}, "", `/${user.username}/`);
    renderWithContext(user, Home, history);

    expect(await screen.findByText(/Test Board/)).toBeInTheDocument();
  });

  test("render board page correctly", async () => {
    const history = window.history.replaceState(
      {},
      "",
      `/b/${board.id}/${board.boardTitle}`
    );
    renderWithContext(user, BoardPage, history);

    expect(await screen.findByText(/Test Board/)).toBeInTheDocument();
    expect(await screen.findByText(/Test List/)).toBeInTheDocument();
    expect(await screen.findByText(/Test Card/)).toBeInTheDocument();
  });

  test("redirects to page not found correctly", async () => {
    const history = window.history.replaceState({}, "", "/undefined-route");
    renderWithRouter(null, history);

    await waitFor(() =>
      expect(screen.getByText(/Page not found/)).toBeInTheDocument()
    );
  });
});
