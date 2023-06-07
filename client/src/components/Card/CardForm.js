import { motion } from 'framer-motion';
import { useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import CloseIcon from '../icons/CloseIcon';

const CardForm = ({ handleNewCard }) => {
  const [cardForm, setCardForm] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!cardTitle.length) return;

    handleNewCard(cardTitle);

    setCardForm(false);
    setCardTitle('');
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleOnSubmit(e);
    }
  };

  const handleOnChange = (e) => {
    setCardTitle(e.target.value);
  };

  const handleFormClose = () => {
    setCardForm(false);
    setCardTitle('');
  };

  if (!cardForm) {
    return (
      <motion.div
        key='button'
        transition={{ duration: 0.15 }}
        initial={{ y: -3, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='text-gray-600 mx-3 mt-2.5 mb-1'
      >
        <button
          onClick={() => setCardForm(true)}
          className='flex items-center rounded-md w-full font-medium bg-gray-300 bg-opacity-60 hover:bg-opacity-100
          p-1.5 px-2 transition-colors duration-150'
        >
          <PlusIcon className='mr-1' />
          <span>Add a card</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key='form'
      transition={{ duration: 0.1 }}
      initial={{ y: -3, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='p-1 text-gray-500 rounded-md mx-2.5 mt-1'
    >
      <form
        onSubmit={(e) => handleOnSubmit(e)}
        className='w-full transition-opacity duration-75'
      >
        <textarea
          value={cardTitle}
          onChange={(e) => handleOnChange(e)}
          onKeyPress={handleEnterKey}
          autoFocus
          maxLength='40'
          placeholder='Enter a title for this card...'
          className='resize-none p-1.5 w-full rounded-md shadow focus:outline-blue'
        />
        <div className='flex items-center mt-1'>
          <button
            type='submit'
            className=' bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700
            font-medium shadow-sm transition-colors duration-150'
          >
            Add card
          </button>
          <button
            type='button'
            onClick={() => handleFormClose()}
            className='flex items-center ml-2.5 opacity-70 hover:opacity-100 transition-opacity duration-100'
          >
            <CloseIcon className='text-2xl' />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CardForm;
