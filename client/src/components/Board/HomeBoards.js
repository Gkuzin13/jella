import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
      duration: 0.2,
    },
    opacity: 0.9,
    x: 0,
  },
};

const icoMotion = {
  rest: {
    color: 'rgb(190, 190, 190)',
  },
  hover: {
    color: 'rgb(225, 255, 255)',
  },
};

const HomeBoards = ({ boards, onBoardDeleteClick }) => {
  if (!boards) {
    return null;
  }

  if (!boards.length) {
    return (
      <div className='p-6'>
        <p className='font-medium text-center text-lg text-gray-500 w-full'>
          Create a board to begin.
        </p>
      </div>
    );
  }

  return (
    <div className='relative'>
      <div className='fixed overflow-y-auto w-full md:max-w-2xl h-3/4 flex flex-col items-start px-4 lg:pl-0 pb-6'>
        {boards.map((board) => {
          return (
            <div
              key={board._id}
              className='bg-white flex justify-between w-full cursor-pointer text-gray-800 mb-5 hover:shadow-lg hover:text-black
            transform-gpu rounded-md transition-all duration-200 shadow'
            >
              <Link
                to={`/b/${board._id}/${board.boardTitle}`}
                className='py-2.5 px-4 mr-1 font-medium w-full'
                aria-label='Go to selected board'
              >
                <div className='flex flex-col justify-center max-w-max'>
                  <span className='text-xl break-words pb-2'>
                    {board.boardTitle}
                  </span>
                  <span className='text-sm font-normal text-gray-500'>
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
                transition={{ duration: 0.1 }}
                onClick={() => onBoardDeleteClick(board._id)}
                type='button'
                className='px-2 flex items-center relative'
              >
                <motion.div
                  variants={bgMotion}
                  className='bg-red-600 rounded-tr-md rounded-br-md h-full left-0 right-0 bottom-0 absolute -z-10'
                />
                <span className='material-icons-outlined'>delete_outline</span>
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeBoards;
