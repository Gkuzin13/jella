import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const SubTaskForm = ({ handleNewSubtask }) => {
  const [taskValue, setTaskValue] = useState('');
  const [taskForm, setTaskForm] = useState(false);

  const boxRef = useRef();

  useClickOutside(boxRef, taskForm, () => {
    if (!taskForm) return;
    setTaskForm(false);
  });

  const onTaskValChange = (e) => {
    setTaskValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    handleNewSubtask(taskValue);

    setTaskForm(false);
    setTaskValue('');
  };

  if (!taskForm) {
    return (
      <div>
        <button
          onClick={() => setTaskForm(true)}
          className='flex items-center w-full shadow bg-gray-50 hover:bg-gray-100 py-1 px-2 
          transition-opacity duration-75 '>
          <span className='material-icons-outlined text-2xl mr-2'>add</span>
          <span className='text-left text-gray-700 font-medium'>
            Add an item
          </span>
        </button>
      </div>
    );
  }

  return (
    <div ref={boxRef} className='w-full'>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <textarea
          value={taskValue}
          onChange={(e) => onTaskValChange(e)}
          name='taskName'
          placeholder='Add an item'
          maxLength='64'
          minLength='1'
          required
          autoFocus
          className='w-full resize-none py-1 p-2 rounded-sm border-2 focus:outline-blue'></textarea>
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
            onClick={() => setTaskForm(false)}>
            <span className='material-icons cursor-pointer ml-1'>close</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubTaskForm;
