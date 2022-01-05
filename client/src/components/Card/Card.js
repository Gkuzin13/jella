import { Draggable } from 'react-beautiful-dnd';
import { getPriorityIcon } from '../../utils/getPriorityIcon';
import { calcTasksStats, getProgressColor } from '../../utils/getProgress';

const Card = ({ cardData, toggleCardBox, index }) => {
  const { total, done } = calcTasksStats(cardData.subtasks || []);
  const priorityIcon = getPriorityIcon(cardData.priority);
  const progressColor = getProgressColor(total, done);
  const priorityColor = `text-${priorityIcon.color}-500`;

  return (
    <Draggable draggableId={cardData._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white cursor-pointer rounded-sm hover:shadow-lg
          transition-shadow duration-150 py-2 px-2.5 mb-3 ${
            snapshot.isDragging ? 'shadow-lg' : 'shadow'
          }`}
          onClick={() => toggleCardBox(cardData._id, true)}>
          <span className='font-medium text-gray-900 pb-2 block'>
            {cardData.cardTitle}
          </span>
          <div className='flex items-start mt-0.5'>
            {total === 0 ? null : (
              <div
                title='Checklist items'
                className={`${progressColor} flex items-center justify-center rounded px-1.5 mr-3`}>
                <span className='material-icons-outlined text-xl'>
                  check_box
                </span>
                <span className='ml-1 text-sm'>
                  {done}/{total}
                </span>
              </div>
            )}
            {cardData.description && (
              <span
                title='This card has a description.'
                className='material-icons-outlined text-gray-300'>
                subject
              </span>
            )}
            <span
              title='Card priority'
              className={`material-icons mb-2.5 mr-1 ml-auto ${priorityColor}`}>
              {priorityIcon.icon}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
