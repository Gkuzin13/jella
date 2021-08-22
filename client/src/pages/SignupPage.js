import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import MiniLoader from '../components/MiniLoader';
import { AuthContext } from '../config/Auth';
import api from '../config/axiosConfig';

const SignupPage = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { email, username, password } = e.target.elements;

    try {
      setLoading(true);
      setError(null);

      const { data } = await api.post('/signup', {
        email: email.value,
        username: username.value,
        password: password.value,
      });

      if (data.error) {
        setLoading(false);
        setError(data.error);
        return;
      }

      setLoading(false);
      setUser(() => data);
      history.push(`/${data.username}/boards`);

      console.log(data);
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
        </Link>{' '}
        <div className='bg-white p-12 shadow-lg rounded-sm '>
          <form
            onSubmit={(e) => handleSignup(e)}
            className='flex flex-col justify-center'>
            <h2 className='text-lg text-center font-medium text-gray-600 mb-10 w-96'>
              Sign up for your account
            </h2>
            <input
              type='email'
              name='email'
              title='Enter email'
              placeholder='Enter email'
              minLength='1'
              aria-required='true'
              required
              className=' border-2 shadow-sm p-2 bg-gray-50 mb-4 '
            />
            <input
              type='text'
              name='username'
              title='Enter username'
              placeholder='Enter Username'
              aria-required='true'
              required
              className=' border-2 shadow-sm p-2 bg-gray-50 mb-4'
            />
            <input
              type='password'
              name='password'
              title='Enter password'
              placeholder='Enter password'
              minLength='8'
              aria-required='true'
              required
              className=' border-2 shadow-sm p-2 bg-gray-50 mb-4'
            />

            <div className='mb-4 text-red-600 rounded-sm w-0 min-w-full'>
              <span>{error ? error : null}</span>
            </div>

            <button
              type='submit'
              className='bg-blue-600 text-white font-medium text-md py-2 shadow mb-5 
              hover:bg-gray-100 transition-colors duration-150'>
              {loading ? <MiniLoader color={true} /> : 'Sign Up'}
            </button>
          </form>
          <div className='text-center mt-4'>
            <span className=' text-gray-600'>Already have an account?</span>
            <Link
              to='/login'
              className='font-medium text-blue-600 hover:text-blue-700 p-1 transition-colors duration-150'>
              {' '}
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
