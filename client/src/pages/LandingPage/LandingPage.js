import { Switch, Route, Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <Link to='/login'>Log in</Link>
      <Link to='/signup'>Sign up</Link>
    </div>
  );
};

export default LandingPage;
