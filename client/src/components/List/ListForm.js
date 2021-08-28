import { useState } from 'react';
import { motion } from 'framer-motion';

const ListForm = ({ lists, handleNewList }) => {
  const [listForm, setListForm] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const handleFormClose = () => {
    setListForm(false);
    setListTitle('');
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    handleNewList(listTitle);

    handleFormClose();
  };

  const handleOnChange = (e) => {
    setListTitle(e.target.value);
  };

  if (!listForm) {
    return (
      <motion.div
        key='button'
        transition={{ duration: 0.3 }}
        initial={{ scale: 0.98, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        className='cursor-pointer flex flex-shrink-0 bg-gray-50 
        shadow-md w-72 p-1.5 mx-1.5 rounded-sm text-gray-600 hover:bg-gray-100
        transition-colors duration-150'>
        <button
          onClick={() => setListForm(true)}
          className='flex items-center w-full transition-opacity duration-75 font-medium 
          p-1 px-1.5'>
          <span className='material-icons mr-1'>add</span>
          <span>{!lists ? 'Add list' : 'Add another list'}</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key='form'
      transition={{ duration: 0.3 }}
      initial={{ y: -5, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      className='cursor-pointer flex flex-col flex-shrink-0 bg-gray-100
      shadow-md w-72 p-1.5 mx-1.5 rounded-sm '>
      <form
        onSubmit={(e) => handleOnSubmit(e)}
        className='w-full flex flex-col'>
        <input
          value={listTitle}
          onChange={(e) => handleOnChange(e)}
          maxLength='40'
          autoFocus
          autoComplete='off'
          required
          placeholder='Enter a title for this list...'
          className='p-1 rounded-sm shadow focus:outline-blue'
        />
        <div className='flex items-center mt-1.5 transition-colors duration-150'>
          <button
            type='submit'
            className=' bg-blue-600 text-white py-1 px-2 rounded-sm  hover:bg-blue-700 
            font-medium shadow'>
            Add list
          </button>
          <button
            type='button'
            className='flex items-center ml-1'
            onClick={() => handleFormClose()}>
            <span
              className='material-icons-outlined text-2xl text-gray-500 cursor-pointer ml-1 
            hover:text-black'>
              close
            </span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ListForm;
