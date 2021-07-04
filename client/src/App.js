import './App.css';
import api from './config/axiosConfig';
import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import BoardPage from './pages/BoardPage/BoardPage';
import LoginPage from './pages/LandingPage/LoginPage';
import SignupPage from './pages/LandingPage/SignupPage';

function App() {
  const [user, setUser] = useState();

  const checkAuth = async () => {
    try {
      const { data } = await api.get('/user');

      if (data) {
        setUser(() => data);
        return;
      }

      setUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <nav>NAV</nav>
      <Switch>
        <Route exact path='/'>
          {!user ? <LandingPage /> : null}
        </Route>

        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>

        <Route path='/:username/boards'>
          {user ? <Home user={user} /> : null}
        </Route>

        <Route path='/b/:id/'>{user ? <BoardPage user={user} /> : null}</Route>
      </Switch>
    </div>
  );
}

export default App;
