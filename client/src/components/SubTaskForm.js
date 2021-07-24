import { useState } from 'react';

const SubTaskForm = ({ taskForm, toggleTaskForm, handleNewSubtask }) => {
  const [taskValue, setTaskValue] = useState('');

  const onTaskValChange = (e) => {
    setTaskValue(e.target.value);
  };

  return (
    <div className='py-3'>
      <button
        onClick={() => toggleTaskForm()}
        className={`${
          taskForm
            ? 'opacity-0 hidden'
            : 'flex items-center w-full shadow bg-gray-50 hover:bg-gray-100 py-1.5 px-3 transition-opacity duration-75'
        } `}>
        <span className='text-left text-gray-700'>Add an item</span>
      </button>
      <form
        onSubmit={(e) => handleNewSubtask(e, setTaskValue)}
        className={`${
          taskForm ? 'block' : 'opacity-0 hidden'
        }  transition-opacity duration-75`}>
        <textarea
          value={taskValue}
          onChange={(e) => onTaskValChange(e)}
          name='taskName'
          placeholder='Add an item'
          className='w-full resize-none py-1 p-2 rounded-sm border-2'></textarea>
        <div className='flex items-center py-1'>
          <button
            type='submit'
            className='bg-blue-600 text-white px-3 py-1 rounded-sm shadow-md'>
            Add
          </button>
          <button
            type='button'
            className='flex items-center ml-2'
            onClick={() => toggleTaskForm()}>
            <span className='material-icons cursor-pointer ml-1 hover:text-black'>
              close
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubTaskForm;
