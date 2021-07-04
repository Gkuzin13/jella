import { useHistory } from 'react-router-dom';
import api from '../../config/axiosConfig';

const LoginPage = () => {
  const history = useHistory();
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    try {
      await api.post('/login', {
        email: email.value,
        password: password.value,
      });

      const user = await api.get('/user');

      history.push(`/${user.data.username}/boards`);
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
