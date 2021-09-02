import { Draggable } from 'react-beautiful-dnd';

const SubTask = ({
  handleSubtaskUpdate,
  handleSubtaskDelete,
  subtask,
  index,
  draggingWith,
}) => {
  const draggingStyle = draggingWith === subtask._id ? 'shadow-md' : '';

  const onSubtaskToggle = () => {
    handleSubtaskUpdate(subtask);
  };

  const onSubtaskDelete = () => {
    handleSubtaskDelete(subtask._id);
  };
  return (
    <Draggable draggableId={subtask._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex justify-between bg-white hover:bg-gray-50 items-center
          w-full bg-opacity-95 py-2 px-1 ${draggingStyle}`}
          key={subtask._id}>
          <div className='flex items-center'>
            <input
              id='isDone'
              type='checkbox'
              className='form-checkbox h-5 w-5 text-red-600 mr-2 cursor-pointer'
              defaultChecked={subtask.isDone}
              onChange={() => onSubtaskToggle()}
            />
            <label
              htmlFor='isDone'
              className={`ml-2 ${
                subtask.isDone && 'line-through opacity-50'
              } `}>
              {subtask.taskName}
            </label>
          </div>

          <span
            role='button'
            onClick={() => onSubtaskDelete()}
            className='material-icons text-gray-400 hover:text-red-500'>
            clear
          </span>
        </div>
      )}
    </Draggable>
  );
};
export default SubTask;
