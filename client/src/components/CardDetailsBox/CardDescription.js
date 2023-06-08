import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import CloseIcon from '../icons/CloseIcon';

const CardDescription = ({ handleCardUpdate, selectedCard }) => {
  const [descForm, setDescForm] = useState(false);
  const [descValue, setDescValue] = useState(selectedCard.description);

  const boxRef = useRef(null);
  useClickOutside(boxRef, () => setDescForm(false));

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
            px-3 py-1.5 pb-8 transition-shadow duration-150 break-words rounded-md'
          >
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
            className='px-2.5 py-1 w-full rounded-md border-2 h-auto focus:outline-blue'
          />
          <div className='flex items-center py-1'>
            <button
              type='submit'
              className='bg-green-500 font-medium text-white hover:bg-green-600
              transition-colors duration-150 px-3 py-1 rounded-md shadow-sm'
            >
              Save
            </button>
            <button
              type='button'
              className='flex items-center ml-2.5 opacity-50 hover:opacity-100 transition-opacity duration-100'
              onClick={() => setDescForm(false)}
            >
              <CloseIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardDescription;
