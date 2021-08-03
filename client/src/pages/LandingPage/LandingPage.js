import { Link } from 'react-router-dom';
import { ReactComponent as BoardImg } from '../../images/boardplanner.svg';

const LandingPage = () => {
  return (
    <div>
      <div className='bg-main w-full h-full -z-10 fixed'></div>
      <div className='flex justify-between'>
        <span>LOGO</span>
      </div>

      <div className='flex flex-col items-center justify-center my-10 mx-auto w-3/4 '>
        <div className='flex-shrink-1'>
          <h1 className='text-4xl font-bold'>
            Company helps teams move work forward.
          </h1>
          <br></br>
          <h3 className='text-2xl font-medium'>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique—accomplish it all with Trello
          </h3>
          <div className='mt-3'>
            <Link to='/signup' className='bg-green-50 text-green-600 py-2 px-3'>
              Sign up
            </Link>
            <button className='ml-2 bg-blue-50 text-blue-600 py-1.5 px-3'>
              Continue as guest
            </button>
          </div>
        </div>

        <div className='w-48'>
          <BoardImg alt='People plan on board' />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
