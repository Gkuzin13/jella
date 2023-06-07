import { useState } from 'react';
import PriorityIcon from '../icons/PriorityIcon';

const CardPriority = ({ handleCardUpdate, selectedCard }) => {
  const [priority, setPriority] = useState(selectedCard.priority);

  const handleValueChange = async (e) => {
    const newPriority = e.target.value;
    setPriority(newPriority);

    const updatedCard = { ...selectedCard, priority: newPriority };

    handleCardUpdate(updatedCard);
  };

  return (
    <div className='my-6'>
      <div className='flex items-center mb-2'>
        <span className='material-icons-outlined mr-2.5'>low_priority</span>
        <span className='text-lg font-bold'>Priority</span>
      </div>
      <div className='flex'>
        <select
          value={priority}
          onChange={(e) => handleValueChange(e)}
          className='p-1.5 my-2 bg-gray-50 shadow cursor-pointer font-medium
          focus:outline-blue'
        >
          <option value='low' className='font-medium'>
            Low
          </option>
          <option value='medium' className='font-medium'>
            Medium
          </option>
          <option value='high' className='font-medium'>
            High
          </option>
        </select>
        <div className='flex items-center'>
          <PriorityIcon priority={priority} className='ml-5' />
        </div>
      </div>
    </div>
  );
};

export default CardPriority;
