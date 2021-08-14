import { useState } from 'react';
import { Types } from 'mongoose';
import listApi from '../../api/listApi';
import ACTIONS from '../../reducers/actions';
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
      coverColor: 'gray',
      boardId: boardId,
    };

    dispatchLists({
      type: ACTIONS.CREATE_LIST,
      payload: newList,
    });

    setListForm(false);
    setListTitle('');

    listApi.createList(newList);

    console.log(newList);
  };

  if (!listForm) {
    return (
      <div
        className='cursor-pointer flex flex-shrink-0 bg-gray-200 bg-opacity-80
        shadow-md w-72 p-1.5 mx-1.5 rounded-sm text-gray-600 hover:bg-opacity-100 
        transition-colors duration-150'>
        <button
          onClick={() => setListForm(true)}
          className='flex items-center w-full transition-opacity duration-75 font-medium p-1 px-1.5'>
          <span className='material-icons mr-1'>add</span>
          <span>{!lists.length ? 'Add list' : 'Add another list'}</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className='cursor-pointer flex flex-col flex-shrink-0 bg-gray-50
    shadow-md w-72 p-1.5 mx-1.5 rounded-sm '>
      <form
        onSubmit={(e) => handleNewList(e)}
        className='w-full transition-opacity duration-75 flex flex-col'>
        <input
          name='listTitle'
          required
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
          maxLength='32'
          autoFocus
          autoComplete='off'
          placeholder='Enter a title for this list...'
          className='p-1 rounded-sm shadow focus:outline-blue'
        />
        <div className='flex items-center mt-1.5 transition-colors duration-150'>
          <button
            type='submit'
            className=' bg-gray-100 text-blue-600 py-1 px-2 rounded-sm  hover:bg-gray-200 font-medium shadow'>
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
