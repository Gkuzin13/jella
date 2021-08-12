import { useState } from 'react';

const CardTitle = ({ value, handleTitleUpdate, inList }) => {
  const [textValue, setTextValue] = useState(value);

  const { listTitle } = inList;

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };
  return (
    <div className='mb-5'>
      <div className='flex items-start w-full mb-2'>
        <span className='material-icons-outlined mr-2'>video_label</span>
        <div className='text-xl w-full'>
          <h2 className='font-medium p-1 px-2 hidden'>{value}</h2>
          <input
            onBlur={() => handleTitleUpdate(textValue)}
            onChange={(e) => handleOnChange(e)}
            className='font-medium bg-transparent w-full px-2 
            resize-none focus:outline-blue'
            value={textValue}
            name='cardTitle'
            maxLength='32'
            autoComplete='off'
          />
        </div>
      </div>

      <p className='text-gray-600'>
        <strong>{listTitle}</strong> List
      </p>
    </div>
  );
};

export default CardTitle;
