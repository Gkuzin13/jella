import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const bgMotion = {
  rest: {
    opacity: 0,
    x: 5,
    transition: {
      duration: 0.05,
    },
  },
  hover: {
    transition: {
      duration: 0.1,
    },
    opacity: 0.9,
    x: 0,
  },
};

const icoMotion = {
  rest: {
    color: 'rgb(220, 38, 38)',
  },
  hover: {
    color: 'rgb(225, 255, 255)',
  },
};

const HomeBoards = ({ boards, setConfirmBox }) => {
  if (!boards.length) {
    return (
      <div className='flex flex-col items-start'>
        <div className='flex items-center mb-3 text-gray-600'>
          <span className='material-icons-outlined text-3xl mr-2'>
            space_dashboard
          </span>
          <h2 className='text-2xl font-medium'>Your Boards</h2>
        </div>
        <p className='font-medium text-md text-gray-500'>
          Create a board to begin.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-start px-4'>
      <div className='flex items-center mb-4 '>
        <span className='material-icons-outlined text-3xl mr-2'>
          space_dashboard
        </span>
        <h2 className='text-2xl font-medium'>Your Boards</h2>
      </div>
      {boards.map((board) => {
        return (
          <div
            key={board._id}
            className='bg-board  flex cursor-pointer mb-5 hover:text-blue-600 hover:shadow-lg 
            hover:border-blue-600  transform-gpu  rounded-sm transition-all duration-150 shadow'>
            <Link
              to={`/b/${board._id}/${board.boardTitle}`}
              className='text-gray-900 py-3 px-4 mr-1 font-medium  
              '
              aria-label='Go to selected board'>
              <div className='flex flex-col justify-center '>
                <span className='text-2xl break-words pb-2'>
                  {board.boardTitle}
                </span>
                <span className='text-sm text-gray-600'>
                  Data Created:
                  <strong> {new Date(board.createdAt).toDateString()}</strong>
                </span>
              </div>
            </Link>

            <motion.button
              initial='rest'
              whileHover='hover'
              animate='rest'
              variants={icoMotion}
              transition={{ duration: 0.01 }}
              onClick={() => setConfirmBox({ id: board._id, isOpen: true })}
              type='button'
              className='text-red-600 hover:text-white px-2 flex items-center relative'>
              <motion.div
                variants={bgMotion}
                className='bg-red-600 h-full left-0 right-0 bottom-0 absolute -z-10'
              />
              <span className='material-icons-outlined'>delete_outline</span>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};

export default HomeBoards;
