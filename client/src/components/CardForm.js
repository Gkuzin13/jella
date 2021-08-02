import { useState } from 'react';
import { useParams } from 'react-router';
import { Types } from 'mongoose';
import { createCard } from '../api/cardController';
import { ACTIONS } from '../hooks/reducers/reducers';
import { appendItem } from '../utils/setNewPos';

const CardForm = ({ listCards, listId, dispatchCards }) => {
  const [cardForm, setCardForm] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const { id } = useParams();

  const handleCardCreate = async (e) => {
    e.preventDefault();

    const newCard = {
      _id: Types.ObjectId().toHexString(),
      cardTitle: cardTitle,
      position: appendItem(listCards),
      listId: listId,
      boardId: id,
    };

    dispatchCards({
      type: ACTIONS.CREATE_CARD,
      data: newCard,
    });

    setCardForm(false);
    setCardTitle('');

    createCard(newCard);
  };

  return (
    <div className='p-1 m-1.5 text-gray-500 rounded-sm'>
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
            type='button'
            className='flex items-center ml-2'
            onClick={() => setCardForm(false)}>
            <span className='material-icons cursor-pointer ml-1 hover:text-black'>
              close
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
