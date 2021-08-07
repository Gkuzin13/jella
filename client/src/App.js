import { Route, Switch } from 'react-router-dom';
import { useContext } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import BoardPage from './pages/BoardPage/BoardPage';
import LoginPage from './pages/LandingPage/LoginPage';
import SignupPage from './pages/LandingPage/SignupPage';
import PrivateRoute from './hooks/PrivateRoute';
import { AuthContext } from './config/Auth';
import PublicRoute from './hooks/PublicRoute';
import NotFound from './pages/NotFound';

function App() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <Switch>
        <PublicRoute exact path='/'>
          <LandingPage />
        </PublicRoute>

        <PublicRoute path='/login'>
          <LoginPage />
        </PublicRoute>

        <PublicRoute path='/signup'>
          <SignupPage />
        </PublicRoute>

        <PrivateRoute path={`/:username/boards`}>
          <Home />
        </PrivateRoute>

        <PrivateRoute path='/b/:id/:boardTitle'>
          <BoardPage />
        </PrivateRoute>

        <Route path='*'>
          <NotFound user={user} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
