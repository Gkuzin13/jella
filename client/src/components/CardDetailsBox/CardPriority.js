import { useState } from 'react';
import api from '../../config/axiosConfig';
import { ACTIONS } from '../../hooks/reducers/reducers';
import { getPriorityIcon } from '../../utils/getPriorityIcon';

const CardPriority = ({ dispatch, selectedCard }) => {
  const [priority, setPriority] = useState(selectedCard.priority);

  const handleValueChange = async (e) => {
    const newPriority = e.target.value;
    setPriority(newPriority);

    try {
      await api.patch(`/1/cards/${selectedCard._id}/priority`, {
        priority: newPriority,
      });

      dispatch({
        type: ACTIONS.UPDATE_PRIORITY,
        data: { cardId: selectedCard._id, priority: newPriority },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const priorityIcon = getPriorityIcon(priority);

  return (
    <div className='my-5'>
      <div className='flex items-center '>
        <span className='material-icons mr-2.5'>low_priority</span>
        <span className='text-lg font-bold'>Priority</span>
      </div>
      <div className='flex'>
        <select
          value={priority}
          className='p-1.5 my-2 bg-gray-50 shadow cursor-pointer'
          onChange={(e) => handleValueChange(e)}>
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
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
