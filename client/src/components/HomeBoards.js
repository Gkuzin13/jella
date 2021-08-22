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
      <div className='flex flex-col items-start px-4 py-8'>
        <p className='font-medium text-md text-gray-500'>
          Create a board to begin.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-start px-4 py-8 w-full'>
      {boards.map((board) => {
        return (
          <div
            key={board._id}
            className='bg-board flex justify-between w-full cursor-pointer mb-5 hover:shadow-md
            transform-gpu rounded-sm transition-all duration-150 shadow'>
            <Link
              to={`/b/${board._id}/${board.boardTitle}`}
              className='py-3 px-4 mr-1 font-medium w-full'
              aria-label='Go to selected board'>
              <div className='flex flex-col justify-center max-w-max'>
                <span className='text-xl break-words pb-2'>
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
