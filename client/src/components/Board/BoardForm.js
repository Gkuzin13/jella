import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MiniLoader from '../MiniLoader';
import useClickOutside from '../../hooks/useClickOutside';

const BoardForm = ({ handleNewBoard }) => {
  const [boardForm, setBoardForm] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef();

  useClickOutside(formRef, boardForm, () => {
    handleFormClose();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    await handleNewBoard(boardTitle);

    handleFormClose();
  };

  const handleFormClose = () => {
    setBoardForm(false);
    setBoardTitle('');
  };

  const handleOnChange = (e) => {
    setBoardTitle(e.target.value);
  };

  return (
    <div className='whitespace-nowrap pb-16 md:pl-24 mx-4'>
      <div className='flex flex-col leading-relaxed text-center'>
        <button
          onClick={() => setBoardForm(true)}
          className='flex items-center justify-center text-2xl bg-green-600 text-white 
          shadow px-6 py-3 mb-2 bg-opacity-90 hover:bg-opacity-100 hover:shadow-md
          transition-all duration-300'>
          <span
            aria-label='Create new board'
            className='material-icons-outlined mr-3'>
            dashboard_customize
          </span>
          Create new board
        </button>
        <p className='text-gray-500 text-center'>
          Visually manage and organize your work.
        </p>
      </div>

      <AnimatePresence>
        {boardForm && (
          <motion.div
            transition={{ duration: 0.075 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex items-center justify-center bg-black bg-opacity-40 
        w-full h-screen z-10 fixed top-0 left-0'>
            <motion.div
              transition={{ duration: 0.075 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}>
              <form
                ref={formRef}
                onSubmit={(e) => handleSubmit(e)}
                className='flex items-center flex-col
                bg-white p-4 shadow-xl w-96'>
                <div className='flex items-center flex-row pb-4 relative px-2'>
                  <span className='text-lg text-gray-500'>
                    Give your board a title
                  </span>
                  <button
                    type='button'
                    onClick={() => handleFormClose()}
                    className='flex text-gray-400 hover:text-gray-700 absolute -right-20 
                    transition-colors duration-150'>
                    <span className='material-icons'>close</span>
                  </button>
                </div>
                <div className='w-full border mb-4 border-opacity-50'></div>

                <input
                  value={boardTitle}
                  onChange={(e) => handleOnChange(e)}
                  maxLength='40'
                  autoFocus
                  autoComplete='off'
                  required
                  placeholder='Enter a title for this board...'
                  className='px-2 py-2 border rounded-sm  w-full'
                />
                <button
                  type='submit'
                  className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-5 font-medium 
                w-full shadow-sm transition-colors duration-150'>
                  {isLoading ? <MiniLoader /> : 'Create board'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoardForm;
