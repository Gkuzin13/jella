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
          className='mt-3 mx-3 bg-white shadow-md cursor-pointer rounded-sm hover:shadow-lg hover:bg-gray-50
          transition-shadow duration-150'>
          <div
            onClick={() => toggleCardBox(cardData._id, true)}
            className='flex flex-col w-full'>
            <span className='px-3 py-2 font-medium text-gray-900 break-words'>
              {cardData.cardTitle}
            </span>
            <div className='flex items-center justify-start w-full'>
              {total === 0 ? null : (
                <div
                  className={`${progressColor} flex items-center justify-center rounded px-1.5 ml-3 mb-2.5 `}>
                  <span className='material-icons-outlined text-lg pr-0.5'>
                    check_box
                  </span>
                  <div className='p-0.5 pt-1 text-sm'>
                    <span>{done}/</span>
                    <span>{total}</span>
                  </div>
                </div>
              )}

              {cardData.description && (
                <span className='material-icons-outlined text-gray-300 mb-2.5 ml-3'>
                  subject
                </span>
              )}

              <span
                className={`material-icons mb-2.5 mr-3 ml-auto text-${priorityIcon.color}-500`}>
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
