import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../config/Auth';
import api from '../../config/axiosConfig';

const LoginPage = () => {
  const { setUser, setIsLoading } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    try {
      const { data } = await api.post('/login', {
        email: email.value,
        password: password.value,
      });

      if (data) {
        setUser(() => data);
        setIsLoading(() => false);
        history.push(`/${data.username}/boards`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleLogin(e)}>
        <h1>Log in</h1>
        <input
          type='email'
          name='email'
          placeholder='Enter email'
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

export default LoginPage;
