import { useState } from 'react';
import api from '../config/axiosConfig';
import { ACTIONS } from '../hooks/reducers/reducers';
import { appendNew } from '../utils/reorderer';

const CardForm = ({ listData, dispatch }) => {
  const [cardForm, setCardForm] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleCardCreate = async (e) => {
    e.preventDefault();

    try {
      const newCard = {
        cardTitle: cardTitle,
        position: appendNew(listData),
        listId: listData._id,
        boardId: listData.boardId,
      };
      const res = await api.post('/1/cards/', newCard);

      if (res.data) {
        dispatch({
          type: ACTIONS.CREATE_CARD,
          data: res.data,
        });

        setCardForm(false);
        setCardTitle('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-1 m-1 text-gray-500 rounded-sm'>
      <button
        onClick={() => setCardForm(true)}
        className={`${
          cardForm
            ? 'opacity-0 hidden'
            : 'flex items-center w-full hover:bg-gray-200 p-1 transition-opacity duration-75'
        } `}>
        <span className='material-icons mr-1'>add</span>
        <span>Add a card</span>
      </button>
      <form
        onSubmit={(e) => handleCardCreate(e)}
        className={`${
          cardForm ? 'block' : 'opacity-0 hidden'
        } w-full transition-opacity duration-75`}>
        <textarea
          name='cardTitle'
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          placeholder='Enter a title for this card...'
          className='resize-none p-1 w-full rounded-sm'></textarea>
        <div className='flex items-center py-1'>
          <button
            type='submit'
            className='bg-blue-700 text-white p-1 rounded-sm'>
            Add card
          </button>
          <button
            className='flex items-center ml-2'
            onClick={() => setCardForm(false)}>
            <span
              type='button'
              className='material-icons cursor-pointer ml-1 hover:text-black'>
              close
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
