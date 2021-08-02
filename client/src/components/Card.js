import { Draggable } from 'react-beautiful-dnd';
import { getPriorityIcon } from '../utils/getPriorityIcon';
import { calcTasksStats } from '../utils/getProgressStats';

const Card = ({ cardData, toggleCardBox, index }) => {
  const { total, done } = calcTasksStats(cardData.subtasks || [], cardData._id);

  const priorityIcon = getPriorityIcon(cardData.priority);

  const { cardTitle } = cardData;

  return (
    <Draggable draggableId={cardData._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='mx-2.5 mb-3 py-1.5 px-2 bg-white shadow-md cursor-pointer rounded-sm'>
          <div
            onClick={() => toggleCardBox(cardData, true)}
            className='flex flex-col w-full'>
            <span className='p-1 mb-1'>{cardTitle}</span>
            <div className='flex items-center justify-start w-full px-1'>
              {total === 0 ? null : (
                <div
                  className={`flex items-center rounded px-1 mr-3 
                ${
                  total === done
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }
              `}>
                  <span className='material-icons-outlined text-lg px-0.5'>
                    check_box
                  </span>
                  <div className='p-0.5 pt-1 text-sm'>
                    <span>{done}/</span>
                    <span>{total}</span>
                  </div>
                </div>
              )}

              {cardData.description ? (
                <span className='material-icons-outlined text-gray-300'>
                  subject
                </span>
              ) : null}

              <span
                className={`material-icons p-0.5 ml-auto text-${priorityIcon.color}-500`}>
                {priorityIcon.icon}
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
