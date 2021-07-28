import { getPriorityIcon } from '../utils/getPriorityIcon';
import { calcTasksStats } from '../utils/getProgressStats';
const Card = ({ cardData, subtasks, toggleCardBox }) => {
  const { total, done } = calcTasksStats(subtasks, cardData._id);

  const priorityIcon = getPriorityIcon(cardData.priority);
  const { cardTitle } = cardData;

  return (
    <div className='mx-2.5 my-1 py-1.5 px-2 bg-white shadow-md cursor-pointer hover:bg-white hover:shadow-lg transition-all duration-200 rounded-sm'>
      <button
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
      </button>
    </div>
  );
};

export default Card;
