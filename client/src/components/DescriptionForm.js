import { useState } from 'react';

const DescriptionForm = ({
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
    <div className='py-3'>
      <button
        onClick={() => setDescForm(true)}
        className={`${
          descForm
            ? 'opacity-0 hidden'
            : 'flex items-center shadow bg-gray-50 hover:bg-gray-100 py-2.5 px-2.5 transition-opacity duration-75'
        } `}>
        <p className='text-left text-gray-600 '>
          {description || 'Add a more detailed description...'}
        </p>
      </button>
      <form
        onSubmit={(e) => handleDescUpdate(e)}
        className={`${
          descForm ? 'block' : 'opacity-0 hidden'
        } w-full transition-opacity duration-75`}>
        <textarea
          value={descValue}
          onChange={(e) => onValueChange(e)}
          name='description'
          placeholder='Add a more detailed description...'
          className=' resize-none p-2 w-full rounded-sm border-2'></textarea>
        <div className='flex items-center py-1'>
          <button
            type='submit'
            className='bg-green-600 text-white px-3 py-1 rounded-sm'>
            Save
          </button>
          <button
            className='flex items-center ml-2'
            onClick={() => setDescForm(false)}>
            <span
              type='button'
              className='material-icons cursor-pointer ml-1 hover:text-black'>
              close
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DescriptionForm;
