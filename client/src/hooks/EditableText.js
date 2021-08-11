import { useState } from 'react';

const EditableText = ({ value, handleTitleUpdate }) => {
  const [textValue, setTextValue] = useState(value);

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };
  return (
    <>
      <h2 className='font-medium p-1 px-2 hidden'>{value}</h2>
      <input
        onBlur={() => handleTitleUpdate(textValue)}
        onChange={(e) => handleOnChange(e)}
        className='font-medium bg-transparent max-w-full focus:bg-white p-1 px-2'
        value={textValue}
        name='cardTitle'
        autoComplete='off'
      />
    </>
  );
};

export default EditableText;
