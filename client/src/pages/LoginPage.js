import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MiniLoader from '../components/MiniLoader';
import { AuthContext } from '../config/Auth';
import api from '../config/axiosConfig';

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    try {
      setError(null);
      setLoading(true);

      const { data } = await api.post('/login', {
        email: email.value,
        password: password.value,
      });

      if (data.error) {
        setLoading(false);
        setError(data.error);
        return;
      }

      setUser(() => data);
      history.push(`/${data.username}/boards`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className='bg-main w-full h-full -z-10 fixed'></div>
      <div className='flex justify-center flex-col items-center'>
        <Link to='/' className='text-4xl font-bold my-10'>
          LOGO
        </Link>
        <div className='bg-white p-12 shadow-lg rounded-sm '>
          <form
            onSubmit={(e) => handleLogin(e)}
            className='flex flex-col justify-center'>
            <h2 className='text-lg text-center font-medium text-gray-600 mb-10 w-96'>
              Log in to your account
            </h2>
            <input
              type='email'
              name='email'
              placeholder='Enter email'
              required
              className=' border-2 shadow-sm p-2 bg-gray-50 mb-4 '
            />
            <input
              type='password'
              name='password'
              placeholder='Enter password'
              minLength='8'
              required
              className=' border-2 shadow-sm p-2 bg-gray-50 mb-4'
            />
            <div className='mb-4 text-red-600 rounded-sm w-0 min-w-full'>
              <span>{error ? error : null}</span>
            </div>

            <button
              type='submit'
              className='bg-gray-50 text-blue-700 font-medium text-md py-2 shadow mb-5 
              hover:bg-gray-100 transition-colors duration-150'>
              {loading ? <MiniLoader color={true} /> : 'Log In'}
            </button>
          </form>
          <div className='text-center mt-4'>
            <span className=' text-gray-600'>Don't have an account?</span>
            <Link
              to='/signup'
              className='font-medium text-blue-600 hover:text-blue-700 p-1 transition-colors duration-150'>
              {' '}
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
