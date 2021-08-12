import { Draggable } from 'react-beautiful-dnd';

const SubTask = ({ toggleCheckbox, handleTaskDelete, subtask, index }) => {
  return (
    <Draggable draggableId={subtask._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='flex justify-between items-center w-full mb-2 bg-gray-50 hover:bg-gray-100 p-1 shadow-sm'
          key={subtask._id}>
          <div className='flex items-center'>
            <input
              name='isDone'
              type='checkbox'
              className='form-checkbox h-4 w-4 text-red-600 mr-3 cursor-pointer'
              defaultChecked={subtask.isDone}
              onChange={(e) => toggleCheckbox(e, subtask._id)}
            />
            <label
              className={`ml-2 text-gray-700 ${
                subtask.isDone && 'line-through text-gray-400'
              } `}>
              {subtask.taskName}
            </label>
          </div>

          <button
            type='button'
            onClick={() => handleTaskDelete(subtask._id)}
            className='flex items-center text-gray-300'>
            <span className='material-icons hover:text-red-500'>clear</span>
          </button>
        </div>
      )}
    </Draggable>
  );
};
export default SubTask;
