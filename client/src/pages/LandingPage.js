import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Types } from 'mongoose';
import MiniLoader from '../components/MiniLoader';
import { AuthContext } from '../config/Auth';
import api from '../config/axiosConfig';
import { ReactComponent as BoardImg } from '../assets/boardplanner.svg';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { setUser } = useContext(AuthContext);

  const history = useHistory();

  const handleGuestLogin = async () => {
    setIsLoading(true);

    try {
      const { data } = await api.post('/login/guest', {
        email: `${Types.ObjectId().toHexString()}@mail.com`,
        password: '123456781',
      });

      if (!data) {
        setIsLoading(false);
        setErrorMsg('Oops, something went wrong...');
        return;
      }

      if (data.username) {
        setIsLoading(false);
        setUser(() => data);

        history.push(`/${data.username}/boards`);

        return;
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('Oops, something went wrong...');
    }
  };

  return (
    <div>
      <div className='bg-main w-full h-full -z-10 fixed top-0'></div>
      <div className='flex justify-between items-center lg:pb-16 md:pt-6 pt-4 px-8 lg:px-24'>
        <a href='/' className='font-bold text-4xl text-blue-900'>
          Jella
        </a>
        <div>
          <Link
            to='/login'
            className='bg-transparent border border-blue-600 text-blue-600 py-2 px-4 shadow font-medium 
              rounded-sm hover:bg-white hover:text-blue-700 transition-colors duration-150 mr-6 '>
            Log In
          </Link>
          <Link
            to='/signup'
            className='bg-blue-600 border border-blue-600 text-white py-2 px-4 shadow font-medium 
              rounded-sm hover:bg-blue-700 transition-colors duration-150 '>
            Sign Up
          </Link>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center my-0 mx-auto w-11/12 px-2 md:flex-row'>
        <div className='md:w-11/12 pt-12 pb-8 md:px-16'>
          <h1 className='text-5xl lg:text-6xl md:mb-6 text-gray-800 font-bold h-full leading-tight text-center lg:text-left'>
            Easily build your <strong className='text-gray-900'>Kanban </strong>
            board within minutes.
          </h1>
          <p className='text-2xl mt-2 text-center text-gray-600 md:text-left'>
            Plan, organize and track your dream projects and everyday tasks.
          </p>
          <div className='mt-8 mb-2 flex items-center text-center text-xl'>
            <button
              onClick={() => handleGuestLogin()}
              aria-label='Continue as a guest user button'
              className='bg-white bg-opacity-70 text-green-600 border border-green-600 py-3 px-8 shadow font-medium
              rounded-sm hover:bg-opacity-90 transition-colors duration-150 w-full h-14 lg:w-1/2 whitespace-nowrap'>
              {isLoading ? (
                <MiniLoader />
              ) : (
                <div className='flex items-center justify-center'>
                  <span>Try It Out</span>
                  <span className='material-icons-outlined ml-2'>forward</span>
                </div>
              )}
            </button>
          </div>
          {errorMsg && <p className='text-red-600'>{errorMsg}</p>}
        </div>

        <div className='w-full h-full md:ml-4'>
          <BoardImg alt='People plan on board' width='100%' height='100%' />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
