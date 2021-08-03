import { Draggable } from 'react-beautiful-dnd';
import { getPriorityIcon } from '../../utils/getPriorityIcon';
import { calcTasksStats, getProgressColor } from '../../utils/getProgress';

const Card = ({ cardData, toggleCardBox, index }) => {
  const { total, done } = calcTasksStats(cardData.subtasks || []);
  const priorityIcon = getPriorityIcon(cardData.priority);
  const progressColor = getProgressColor(total, done);

  return (
    <Draggable draggableId={cardData._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='mx-2.5 mb-3 py-2.5 px-2 bg-white shadow-md cursor-pointer rounded-sm hover:shadow-lg transition-shadow duration-150'>
          <div
            onClick={() => toggleCardBox(cardData._id, true)}
            className='flex flex-col w-full'>
            <span className='p-1 mb-1.5'>{cardData.cardTitle}</span>
            <div className='flex items-center justify-start w-full px-1'>
              {total === 0 ? null : (
                <div
                  className={`${progressColor} flex items-center justify-center rounded px-1.5 mr-3 `}>
                  <span className='material-icons-outlined text-lg pr-0.5'>
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
