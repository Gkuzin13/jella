import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import BoardPage from './pages/BoardPage/BoardPage';
import LoginPage from './pages/LandingPage/LoginPage';
import SignupPage from './pages/LandingPage/SignupPage';
import PrivateRoute from './components/PrivateRoute';
import { useContext } from 'react';
import { AuthContext } from './config/Auth';

function App() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <nav>NAV</nav>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>

        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>

        <PrivateRoute path={`/${user.username}/boards`}>
          <Home />
        </PrivateRoute>

        <PrivateRoute path='/b/:id/:boardTitle'>
          <BoardPage />
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
