import { useState } from 'react';
import api from '../config/axiosConfig';
import { ACTIONS } from '../reducers/reducers';

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

  const getIcon = () => {
    switch (priority) {
      case 'medium':
        return { color: 'yellow', icon: 'short_text' };
      case 'high':
        return { color: 'red', icon: 'sort' };
      default:
        return { color: 'green', icon: 'remove' };
    }
  };

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
          <span className={`material-icons ml-5 text-${getIcon().color}-500`}>
            {getIcon().icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardPriority;
