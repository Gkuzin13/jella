import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';
import { useContext } from 'react';

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <br></br>
      <Link to='/login'>Log in</Link>
      <Link to='/signup'>Sign up</Link>
    </div>
  );
};

export default LandingPage;
