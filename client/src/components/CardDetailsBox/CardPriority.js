import { useState } from 'react';
import api from '../../config/axiosConfig';
import ACTIONS from '../../reducers/actions';
import { getPriorityIcon } from '../../utils/getPriorityIcon';

const CardPriority = ({ dispatchCards, selectedCard }) => {
  const [priority, setPriority] = useState(selectedCard.priority);

  const handleValueChange = async (e) => {
    const newPriority = e.target.value;
    setPriority(newPriority);

    try {
      await api.patch(`/1/cards/${selectedCard._id}/priority`, {
        priority: newPriority,
      });

      dispatchCards({
        type: ACTIONS.UPDATE_PRIORITY,
        payload: { cardId: selectedCard._id, priority: newPriority },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const priorityIcon = getPriorityIcon(priority);

  return (
    <div className='my-6'>
      <div className='flex items-center '>
        <span className='material-icons-outlined mr-2.5'>low_priority</span>
        <span className='text-lg font-bold'>Priority</span>
      </div>
      <div className='flex'>
        <select
          value={priority}
          className='p-1.5 my-2 bg-gray-50 shadow cursor-pointer font-medium'
          onChange={(e) => handleValueChange(e)}>
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
          <span
            className={`material-icons ml-5 text-${priorityIcon.color}-500`}>
            {priorityIcon.icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardPriority;
