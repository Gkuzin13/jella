import { useState } from 'react';
import { motion } from 'framer-motion';

const CardForm = ({ handleNewCard }) => {
  const [cardForm, setCardForm] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    handleNewCard(cardTitle);

    setCardForm(false);
    setCardTitle('');
  };

  if (!cardForm) {
    return (
      <div className='text-gray-600 bg-gray-200 rounded-sm mx-2.5 mt-2.5 mb-1'>
        <button
          onClick={() => setCardForm(true)}
          className='flex items-center w-full font-medium hover:bg-gray-200 
          hover:text-gray-700 p-1.5 px-2 transition-colors duration-150'>
          <span className='material-icons mr-1'>add</span>
          <span>Add a card</span>
        </button>
      </div>
    );
  }

  return (
    <motion.div
      key={cardTitle}
      transition={{ duration: 0.075 }}
      initial={{ y: -3, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='p-1 text-gray-500 rounded-sm mx-2.5 mt-1'>
      <form
        onSubmit={(e) => handleOnSubmit(e)}
        className='w-full transition-opacity duration-75'>
        <textarea
          name='cardTitle'
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          autoFocus
          placeholder='Enter a title for this card...'
          className='resize-none p-1.5 w-full rounded-sm shadow focus:outline-blue'
        />
        <div className='flex items-center mt-1'>
          <button
            type='submit'
            className=' bg-blue-600 text-white py-1 px-2 rounded-sm hover:bg-blue-700 
            font-medium shadow-sm transition-colors duration-150'>
            Add card
          </button>
          <button
            type='button'
            className='flex items-center ml-1'
            onClick={() => setCardForm(false)}>
            <span
              className='material-icons-outlined text-2xl text-gray-500 
            cursor-pointer ml-2 hover:text-gray-700'>
              close
            </span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CardForm;
