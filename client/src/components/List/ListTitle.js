import { useState } from 'react';

const ListTitle = ({ listTitle, handleTitleUpdate }) => {
  const [textValue, setTextValue] = useState(listTitle);

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <div>
      <h2 className='font-medium p-1 px-2 hidden'>{textValue}</h2>
      <input
        onBlur={() => handleTitleUpdate(textValue)}
        onChange={(e) => handleOnChange(e)}
        className='font-medium bg-transparent focus:bg-white focus:text-black
      text-white p-1 px-2 focus:ring-2 focus:ring-blue-600 '
        value={textValue}
        name='cardTitle'
        autoComplete='off'
      />
    </div>
  );
};

export default ListTitle;
