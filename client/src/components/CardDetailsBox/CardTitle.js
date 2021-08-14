import { useState } from 'react';

const CardTitle = ({ value, handleTitleUpdate, inList }) => {
  const [textValue, setTextValue] = useState(value);

  const { listTitle } = inList;

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };
  return (
    <div className='flex items-start w-full mb-6 mt-8'>
      <span className='material-icons-outlined mr-1'>video_label</span>
      <div className='w-full'>
        <h2 className='font-medium p-1 px-2 hidden'>{value}</h2>
        <input
          onBlur={() => handleTitleUpdate(textValue)}
          onChange={(e) => handleOnChange(e)}
          className='font-medium bg-transparent w-full px-2 
            resize-none focus:outline-blue text-xl'
          value={textValue}
          name='cardTitle'
          maxLength='32'
          autoComplete='off'
        />
        <p className='text-gray-600 pl-2 leading-relaxed'>
          <strong>{listTitle}</strong> list
        </p>
      </div>
    </div>
  );
};

export default CardTitle;
