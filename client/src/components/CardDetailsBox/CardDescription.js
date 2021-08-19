import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const CardDescription = ({ handleCardUpdate, selectedCard }) => {
  const [descForm, setDescForm] = useState(false);
  const [descValue, setDescValue] = useState(selectedCard.description);

  const boxRef = useRef();

  useClickOutside(boxRef, descForm, () => {
    setDescForm(false);
  });

  const onValueChange = (e) => {
    setDescValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const updatedCard = { ...selectedCard, description: descValue };

    handleCardUpdate(updatedCard);
    setDescForm(false);
  };

  if (!descForm) {
    return (
      <div className='mt-6 mb-8'>
        <div className='flex items-center text-gray-800 mb-4'>
          <span className='material-icons-outlined mr-2.5'>event_note</span>
          <span className='font-semibold text-xl'>Description</span>
        </div>
        <div>
          <p
            role='button'
            onClick={() => setDescForm(true)}
            className='hover:shadow text-gray-800 bg-gray-50 cursor-pointer 
            px-3 py-1.5 pb-8 transition-shadow duration-150 break-words'>
            {descValue || 'Add a description to this card...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='mt-6 mb-8'>
      <div className='flex items-center text-gray-800 mb-4'>
        <span className='material-icons-outlined mr-2.5'>event_note</span>
        <span className='font-semibold text-xl'>Description</span>
      </div>
      <div ref={boxRef}>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <textarea
            value={descValue || ''}
            onChange={(e) => onValueChange(e)}
            name='description'
            rows='4'
            autoFocus
            placeholder='Add a description to this card...'
            className='px-2.5 py-1 w-full rounded-sm border-2 h-auto focus:outline-blue'
          />
          <div className='flex items-center py-1'>
            <button
              type='submit'
              className='bg-green-500 font-medium text-white hover:bg-green-600 
              transition-colors duration-150 px-3 py-1 rounded-sm shadow-sm'>
              Save
            </button>
            <button
              type='button'
              className='flex items-center ml-2'
              onClick={() => setDescForm(false)}>
              <span className='material-icons cursor-pointer ml-1 hover:text-black'>
                close
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardDescription;
