import { useState } from 'react';

const ListTitle = ({ listData, handleListUpdate }) => {
  const [textValue, setTextValue] = useState(listData.listTitle);

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleOnBlur = () => {
    if (textValue === listData.listTitle) {
      return;
    }

    handleListUpdate({ ...listData, listTitle: textValue });
  };

  return (
    <div>
      <label htmlFor='cardTitle' className='font-medium p-1 px-2 hidden'>
        {textValue}
      </label>
      <input
        onBlur={() => handleOnBlur()}
        onChange={(e) => handleOnChange(e)}
        className='font-medium bg-transparent focus:bg-white focus:text-black
      text-white p-1 px-2 focus:outline-none'
        value={textValue}
        name='cardTitle'
        autoComplete='off'
      />
    </div>
  );
};

export default ListTitle;
