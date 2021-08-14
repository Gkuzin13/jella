import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const CardDescription = ({ handleDescUpdate, description }) => {
  const [descForm, setDescForm] = useState(false);
  const [descValue, setDescValue] = useState(description);

  const boxRef = useRef();

  useClickOutside(boxRef, descForm, () => {
    setDescForm(false);
  });

  const onValueChange = (e) => {
    setDescValue(e.target.value);
  };

  const handleNewDesc = (value) => {
    handleDescUpdate(value);
    setDescForm(false);
  };

  if (!descForm) {
    return (
      <div className='my-6'>
        <div className='flex items-center text-gray-800 mb-1'>
          <span className='material-icons-outlined mr-2.5'>event_note</span>
          <span className='font-semibold text-xl'>Description</span>
        </div>
        <div>
          <div
            onClick={() => setDescForm(true)}
            className=' hover:bg-gray-100 cursor-pointer px-3 py-1.5 pb-8 transition-colors 
            duration-150 break-words'>
            <p>{description || 'Add a more detailed description...'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='my-6'>
      <div className='flex items-center text-gray-800 mb-1'>
        <span className='material-icons-outlined mr-2.5'>event_note</span>
        <span className='font-semibold text-xl'>Description</span>
      </div>
      <div ref={boxRef}>
        <div>
          <textarea
            value={descValue || ''}
            onChange={(e) => onValueChange(e)}
            name='description'
            rows='4'
            autoFocus
            placeholder='Add a more detailed description...'
            className='px-2.5 py-1 w-full rounded-sm border-2 h-auto focus:outline-blue'
          />
          <div className='flex items-center py-1'>
            <button
              onClick={() => handleNewDesc(descValue)}
              type='button'
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
        </div>
      </div>
    </div>
  );
};

export default CardDescription;
