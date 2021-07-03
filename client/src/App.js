import './App.css';
import api from './config/axiosConfig';
import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';

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
  console.log(user);
  return (
    <div>
      <Switch>
        <Route path='/home'>{user ? <Home /> : null}</Route>
        <Route path='/'>{!user ? <LandingPage /> : null}</Route>
      </Switch>
    </div>
  );
}

export default App;
