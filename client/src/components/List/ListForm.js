import { useState } from 'react';
import { Types } from 'mongoose';
import { createList } from '../../api/listController';
import { ACTIONS } from '../../hooks/reducers/reducers';
import { appendItem } from '../../utils/setNewPos';

const ListForm = ({ boardId, lists, dispatchLists }) => {
  const [listForm, setListForm] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const handleNewList = async (e) => {
    e.preventDefault();

    const newList = {
      _id: Types.ObjectId().toHexString(),
      listTitle: listTitle,
      position: appendItem(lists),
      boardId: boardId,
    };

    dispatchLists({
      type: ACTIONS.CREATE_LIST,
      data: newList,
    });

    setListForm(false);
    setListTitle('');
    createList(newList);

    console.log(newList);
  };

  return (
    <div className='cursor-pointer flex flex-col flex-shrink-0 bg-gray-100 shadow-md w-64 p-1.5 mx-1.5 rounded-sm '>
      <button
        onClick={() => setListForm(true)}
        className={`${
          listForm
            ? 'opacity-0 hidden'
            : 'flex items-center w-full transition-opacity duration-75 opacity-50 font-medium p-1 px-1.5'
        } `}>
        <span className='material-icons mr-1'>add</span>
        <span>{!lists.length ? 'Add list' : 'Add another list'}</span>
      </button>
      <form
        onSubmit={(e) => handleNewList(e)}
        className={`${
          listForm ? 'block' : 'opacity-0 hidden'
        } w-full transition-opacity duration-75 flex flex-col`}>
        <input
          name='listTitle'
          required
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          placeholder='Enter a title for this list...'
          className='p-1 rounded-sm shadow'
        />
        <div className='flex items-center mt-1.5 transition-colors duration-150'>
          <button
            type='submit'
            className=' text-blue-500 py-1 px-2 rounded-sm hover:bg-blue-100 hover:text-blue-600 font-medium'>
            Add list
          </button>
          <button
            type='button'
            className='flex items-center ml-1'
            onClick={() => setListForm(false)}>
            <span className='material-icons-outlined text-2xl text-gray-500 cursor-pointer ml-1 hover:text-black'>
              close
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListForm;