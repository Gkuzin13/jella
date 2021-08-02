const SubTask = ({ toggleCheckbox, handleTaskDelete, subtask }) => {
  return (
    <div
      className='flex justify-between items-center w-full mt-1 bg-gray-50 hover:bg-gray-100 px-1'
      key={subtask._id}>
      <label className='flex items-center my-1'>
        <input
          name='isDone'
          type='checkbox'
          className='form-checkbox h-5 w-5 text-red-600'
          defaultChecked={subtask.isDone}
          onChange={(e) => toggleCheckbox(e, subtask._id)}
        />
        <span
          className={`ml-2 text-gray-700 ${
            subtask.isDone ? 'line-through text-gray-500' : null
          } `}>
          {subtask.taskName}
        </span>
      </label>

      <button
        type='button'
        onClick={() => handleTaskDelete(subtask._id)}
        className='flex items-center text-gray-300'>
        <span className='material-icons hover:text-red-500'>clear</span>
      </button>
    </div>
  );
};

export default SubTask;
