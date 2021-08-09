import { useState } from 'react';

const CardDescription = ({
  descForm,
  setDescForm,
  handleDescUpdate,
  description,
}) => {
  const [descValue, setDescValue] = useState(description);

  const onValueChange = (e) => {
    setDescValue(e.target.value);
  };

  if (!descForm) {
    return (
      <div className='my-5'>
        <div className='flex items-center text-gray-800 mb-1'>
          <span className='material-icons mr-2.5 '>event_note</span>
          <span className='font-semibold text-xl'>Description</span>
        </div>
        <div>
          <div
            onClick={() => setDescForm(true)}
            className=' hover:bg-gray-100 cursor-pointer px-3 py-1.5 pb-8 transition-colors 
            duration-150 break-all'>
            <p>{description || 'Add a more detailed description...'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='my-5'>
      <div className='flex items-center text-gray-800 mb-1'>
        <span className='material-icons mr-2.5 '>event_note</span>
        <span className='font-semibold text-xl'>Description</span>
      </div>
      <div>
        <div>
          <textarea
            value={descValue || ''}
            onChange={(e) => onValueChange(e)}
            name='description'
            rows='4'
            placeholder='Add a more detailed description...'
            className='px-2.5 py-1 w-full rounded-sm border-2 h-auto'
          />
          <div className='flex items-center py-1'>
            <button
              onClick={() => handleDescUpdate(descValue)}
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
