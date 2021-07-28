import { useState } from 'react';
import api from '../config/axiosConfig';
import { ACTIONS } from '../hooks/reducers/reducers';
import { appendNew } from '../utils/reorderer';

const ListForm = ({ boardId, lists, dispatch }) => {
  const [listForm, setListForm] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const handleNewList = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post('/1/lists/', {
        listTitle: listTitle,
        position: appendNew(lists),
        boardId: boardId,
      });
      if (data) {
        dispatch({
          type: ACTIONS.CREATE_LIST,
          data: data,
        });
        console.log(data);
        setListForm(false);
        setListTitle('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='cursor-pointer flex flex-col flex-shrink-0 bg-gray-200 shadow-md w-64 p-2 mx-1.5 rounded-sm hover:bg-gray-200'>
      <button
        onClick={() => setListForm(true)}
        className={`${
          listForm
            ? 'opacity-0 hidden'
            : 'flex items-center w-full p-0.5 transition-opacity duration-75 opacity-50'
        } `}>
        <span className='material-icons mr-1'>add</span>
        <span>Add another list</span>
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
          className='p-1 rounded-sm'
        />
        <div className='flex items-center mt-1'>
          <button
            type='submit'
            className='bg-blue-600 text-white mt-1 px-2 py-1 rounded-sm'>
            Add list
          </button>
          <button
            className='flex items-center opacity-50 hover:opacity-100'
            type='button'
            onClick={() => setListForm(false)}>
            <span className='material-icons cursor-pointer ml-1 hover:text-black'>
              close
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListForm;
