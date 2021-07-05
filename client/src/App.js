import './App.css';
import api from './config/axiosConfig';
import { useContext, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthContext } from './config/Auth';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import BoardPage from './pages/BoardPage/BoardPage';
import LoginPage from './pages/LandingPage/LoginPage';
import SignupPage from './pages/LandingPage/SignupPage';

function App() {
  const { user } = useContext(AuthContext);

  console.log(user);
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

        <Route path='/:username/boards'>{user ? <Home /> : null}</Route>

        <Route path='/b/:id/'>{user ? <BoardPage /> : null}</Route>
      </Switch>
    </div>
  );
}

export default App;
