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

  return (
    <div className='my-5'>
      <div className='flex items-center text-gray-800 mb-1'>
        <span className='material-icons mr-2.5 '>event_note</span>
        <span className='font-semibold text-xl'>Description</span>
      </div>
      <div>
        <div
          onClick={() => setDescForm(true)}
          className={`${
            descForm
              ? 'opacity-0 hidden'
              : ' hover:bg-gray-100 p-2.5 transition-opacity duration-75 break-all'
          } `}>
          <p className='text-left text-gray-600'>
            {description || 'Add a more detailed description...'}
          </p>
        </div>
        <div
          className={`${
            descForm ? 'block' : 'opacity-0 hidden'
          } w-full transition-opacity duration-75`}>
          <textarea
            value={descValue || ''}
            onChange={(e) => onValueChange(e)}
            name='description'
            placeholder='Add a more detailed description...'
            className='p-2 w-full rounded-sm border-2 h-auto'
          />
          <div className='flex items-center py-1'>
            <button
              onClick={() => handleDescUpdate(descValue)}
              type='button'
              className='bg-green-600 text-white px-3 py-1 rounded-sm'>
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
