import { useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';

const SignupPage = () => {
  const { user, setIsLoading, setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { email, username, password } = e.target.elements;

    try {
      const { data } = await api.post('/signup', {
        email: email.value,
        username: username.value,
        password: password.value,
      });

      if (data) {
        setUser(() => data);
        setIsLoading(() => false);
        history.push(`/${data.username}/boards`);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSignup(e)}>
        <h1>Sign up</h1>
        <input
          type='email'
          name='email'
          placeholder='Enter email'
          required></input>
        <input
          type='text'
          name='username'
          placeholder='Enter Username'
          required></input>
        <input
          type='password'
          name='password'
          placeholder='Enter password'
          required></input>

        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default SignupPage;
