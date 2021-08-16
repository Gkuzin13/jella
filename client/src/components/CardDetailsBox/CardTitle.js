import { useState } from 'react';

const CardTitle = ({ selectedCard, handleCardUpdate, inList }) => {
  const [textValue, setTextValue] = useState(selectedCard.cardTitle);

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleOnBlur = () => {
    if (textValue === selectedCard.cardTitle) {
      return;
    }

    const updatedCard = { ...selectedCard, cardTitle: textValue };
    handleCardUpdate(updatedCard);
  };

  return (
    <div className='flex items-start w-full mb-6 mt-8'>
      <span className='material-icons-outlined mr-1'>video_label</span>
      <div className='w-full'>
        <h2 className='font-medium bg-transparent w-full px-2 text-xl hidden'>
          {textValue}
        </h2>
        <input
          onBlur={() => handleOnBlur()}
          onChange={(e) => handleOnChange(e)}
          className='font-medium bg-transparent w-full px-2 
            resize-none focus:outline-blue text-xl'
          value={textValue}
          name='cardTitle'
          maxLength='32'
          autoComplete='off'
        />
        <p className='text-gray-600 pl-2 leading-loose'>
          <strong>{inList}</strong> list
        </p>
      </div>
    </div>
  );
};

export default CardTitle;
