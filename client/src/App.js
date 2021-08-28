import { Route, Switch } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './config/Auth';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import BoardPage from './pages/BoardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';

function App() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Switch>
        <PublicRoute exact path='/'>
          <LandingPage />
        </PublicRoute>

        <PublicRoute exact path='/login'>
          <LoginPage />
        </PublicRoute>

        <PublicRoute exact path='/signup'>
          <SignupPage />
        </PublicRoute>

        <PrivateRoute exact path='/:username/boards'>
          <Home user={user} />
        </PrivateRoute>

        <PrivateRoute exact path='/b/:id/:boardTitle'>
          <BoardPage user={user} />
        </PrivateRoute>

        <Route path='*'>
          <NotFound user={user} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
