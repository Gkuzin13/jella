import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
      <div className='bg-main w-full h-full -z-10 fixed'></div>
      <div className='flex justify-center flex-col items-center'>
        <div className='text-4xl font-bold my-10'>LOGO</div>
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
              required
              className=' border-2 shadow-sm p-2 bg-gray-50 mb-4'
            />
            <button
              type='submit'
              className='bg-blue-100 text-blue-600 font-medium text-lg p-1 shadow mb-5 
              hover:bg-blue-200 transition-colors duration-150'>
              Log In
            </button>
          </form>
          <div className='text-center mt-4'>
            <span className=' text-gray-600'>Don't have an account?</span>
            <Link
              to='/signup'
              className='font-medium text-green-600 hover:text-green-700 p-1 transition-colors duration-150'>
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
