import { getPriorityIcon } from '../utils/getPriorityIcon';
import { calcTasksStats } from '../utils/getProgressStats';
const Card = ({ cardData, subtasks, toggleCardBox }) => {
  const { total, done } = calcTasksStats(subtasks, cardData._id);

  const priorityIcon = getPriorityIcon(cardData.priority);
  const { cardTitle } = cardData;

  return (
    <div className='mx-2.5 my-1 py-1.5 px-2 bg-gray-50 shadow-md cursor-pointer hover:bg-white hover:shadow-lg transition-colors duration-75 rounded-sm'>
      <button
        onClick={() => toggleCardBox(cardData, true)}
        className='flex flex-col w-full'>
        <span className='p-1'>{cardTitle}</span>
        <div className='flex'>
          <div className='flex items-center'>
            <span className={`material-icons text-${priorityIcon.color}-500`}>
              {priorityIcon.icon}
            </span>
            <span className='material-icons ml-3 text-gray-300'>list_alt</span>
            <div>
              <span>{done}/</span>
              <span>{total}</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Card;
