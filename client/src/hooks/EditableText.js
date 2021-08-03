import { useState } from 'react';

const EditableText = ({ value, handleTitleUpdate }) => {
  const [textValue, setTextValue] = useState(value);

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };
  return (
    <div>
      <h2 className='font-medium p-1 px-2 hidden'>{value}</h2>
      <input
        onBlur={() => handleTitleUpdate(textValue)}
        onChange={(e) => handleOnChange(e)}
        className='font-medium bg-transparent focus:bg-white p-1 px-2 w-full'
        value={textValue}
        name='cardTitle'
        autoComplete='off'
      />
    </div>
  );
};

export default EditableText;
