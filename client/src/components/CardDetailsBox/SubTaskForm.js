import { useState } from 'react';

const SubTaskForm = ({ taskForm, toggleTaskForm, handleNewSubtask }) => {
  const [taskValue, setTaskValue] = useState('');

  const onTaskValChange = (e) => {
    setTaskValue(e.target.value);
  };

  if (!taskForm) {
    return (
      <div className='py-3'>
        <button
          onClick={() => toggleTaskForm()}
          className='flex items-center w-full shadow bg-gray-50 hover:bg-gray-100 py-1.5 px-3 transition-opacity duration-75'>
          <span className='text-left text-gray-700'>Add an item</span>
        </button>
      </div>
    );
  }

  return (
    <div className='py-3 w-full '>
      <form onSubmit={(e) => handleNewSubtask(e, setTaskValue)}>
        <textarea
          value={taskValue}
          onChange={(e) => onTaskValChange(e)}
          name='taskName'
          placeholder='Add an item'
          className='w-full resize-none py-1 p-2 rounded-sm border-2'></textarea>
        <div className='flex items-center py-1'>
          <button
            type='submit'
            className='bg-blue-600 text-white hover:bg-blue-700 transition-colors 
            duration-150 px-3 py-1 rounded-sm shadow-md'>
            Add
          </button>
          <button
            type='button'
            className='flex items-center ml-2 hover:text-gray-700 transition-colors duration-150'
            onClick={() => toggleTaskForm()}>
            <span className='material-icons cursor-pointer ml-1'>close</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubTaskForm;
