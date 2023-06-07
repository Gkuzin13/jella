import { Draggable } from 'react-beautiful-dnd';
import { countSubtasksDone } from '../../utils/math';
import PriorityIcon from '../icons/PriorityIcon';
import DescriptionIcon from '../icons/DescriptionIcon';
import TaskCount from '../TaskCount';

const Card = ({ cardData, toggleCardBox, index }) => {
  const { total, done } = countSubtasksDone(cardData.subtasks || []);
  const hasTasks = total > 0;

  return (
    <Draggable draggableId={cardData._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white cursor-pointer rounded-md hover:shadow-lg
          transition-shadow duration-150 py-2 px-2.5 mt-3 ${
            snapshot.isDragging ? 'shadow-lg' : 'shadow'
          }`}
          onClick={() => toggleCardBox(cardData._id, true)}
        >
          <span className='font-medium text-gray-900 pb-2 block'>
            {cardData.cardTitle}
          </span>
          <div className='flex items-start mt-0.5'>
            {hasTasks && (
              <TaskCount done={done} total={total} title='Checklist items' />
            )}
            {cardData.description && <DescriptionIcon />}
            <PriorityIcon
              priority={cardData.priority}
              className='mb-2.5 mr-1 ml-auto'
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
