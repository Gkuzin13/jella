import { Switch, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const LandingPage = () => {
  return (
    <div>
      <Link to='/login'>Log in</Link>
      <Link to='/signup'>Sign up</Link>
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>
      </Switch>
    </div>
  );
};

export default LandingPage;
