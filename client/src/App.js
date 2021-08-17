import { Route, Switch } from 'react-router-dom';
import { useContext } from 'react';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import BoardPage from './pages/BoardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { AuthContext } from './config/Auth';
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

        <PrivateRoute path='/:username/boards'>
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
