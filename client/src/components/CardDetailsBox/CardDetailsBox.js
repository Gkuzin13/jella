import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import ACTIONS from '../../reducers/actions';
import CardTitle from './CardTitle';
import Checklist from '../CardDetailsBox/Checklist';
import CardPriority from '../CardDetailsBox/CardPriority';
import CardDescription from '../CardDetailsBox/CardDescription';
import CardDate from './CardDate';
import cardApi from '../../api/cardApi';

const CardDetailsBox = ({
  toggleCardBox,
  cardBox,
  cardData,
  dispatchCards,
}) => {
  const boxRef = useRef();
  const { cards, lists, cardId } = cardData;

  useClickOutside(boxRef, cardBox, () => {
    toggleCardBox('', false);
  });

  const selectedCard = cards.find((card) => card._id === cardId);
  const inList = lists.find((list) => list._id === selectedCard.listId);

  const handleCardUpdate = (card) => {
    dispatchCards({
      type: ACTIONS.EDIT_CARD,
      payload: card,
    });

    cardApi.updateCard(card);
  };

  const handleCardDelete = () => {
    dispatchCards({
      type: ACTIONS.DELETE_CARD,
      payload: { id: selectedCard._id },
    });

    toggleCardBox('', false);
    cardApi.deleteCard(selectedCard._id);
  };

  const handleDescUpdate = (descValue) => {
    const updatedCard = { ...selectedCard, description: descValue };

    handleCardUpdate(updatedCard);
  };

  const handleTitleUpdate = (value) => {
    const updatedCard = { ...selectedCard, cardTitle: value };

    handleCardUpdate(updatedCard);
  };

  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 overflow-auto bg-opacity-30 bg-black z-20'>
      <div className='grid place-items-center py-20'>
        <div className='flex flex-col justify-between relative p-6 w-11/12 lg:w-2/4 lg:px-10 bg-white shadow-2xl'>
          <button
            className='flex items-center absolute right-0 top-0 m-4 hover:bg-gray-100 group transition-colors duration-150 p-1.5 mb-2'
            onClick={() => toggleCardBox()}>
            <span className='material-icons text-gray-500 group-hover:text-gray-600'>
              close
            </span>
          </button>

          <CardTitle
            handleTitleUpdate={handleTitleUpdate}
            value={selectedCard.cardTitle}
            inList={inList}
          />
          <CardDescription
            handleDescUpdate={handleDescUpdate}
            description={selectedCard.description}
          />
          <Checklist
            dispatchCards={dispatchCards}
            selectedCard={selectedCard}
          />
          <CardPriority
            dispatchCards={dispatchCards}
            selectedCard={selectedCard}
          />
          <CardDate selectedCard={selectedCard} />

          <div className='self-end py-2 mt-6'>
            <button
              onClick={() => handleCardDelete()}
              className='bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 font-medium px-3 py-1 rounded-sm transition-colors duration-75'>
              Delete Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsBox;
