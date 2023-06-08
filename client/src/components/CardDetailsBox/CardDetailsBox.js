import cardApi from '../../api/cardApi';
import ACTIONS from '../../reducers/actions';
import CardDescription from '../CardDetailsBox/CardDescription';
import CardPriority from '../CardDetailsBox/CardPriority';
import Checklist from '../CardDetailsBox/Checklist';
import EditableText from '../EditableText';
import CardDate from './CardDate';
import Dialog from '../Dialog/Dialog';

const titleStyle = {
  style: 'font-medium px-2 focus:outline-blue text-xl',
};

const CardDetailsBox = ({ card, onClose, dispatchCards }) => {
  const handleCardUpdate = async (updatedCard) => {
    dispatchCards({
      type: ACTIONS.EDIT_CARD,
      payload: updatedCard,
    });

    try {
      await cardApi.update(updatedCard);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardDelete = async () => {
    dispatchCards({
      type: ACTIONS.DELETE_CARD,
      payload: { id: card._id },
    });

    onClose(null);
    cardApi.delete(card._id);
  };

  const handleTitleUpdate = (updatedTitle) => {
    handleCardUpdate({
      ...card,
      cardTitle: updatedTitle,
    });
  };

  return (
    <Dialog open={!!card} onClickOutside={() => onClose(null)}>
      <Dialog.Close
        className='bg-transparent hover:bg-gray-200 p-0.5 rounded-md'
        onClick={() => onClose(null)}
      />
      {card && (
        <Dialog.Content className='p-6 w-screen max-w-sm md:max-w-3xl lg:px-10'>
          <div className='flex items-start w-full mb-6 mt-8'>
            <span className='material-icons-outlined mr-1'>video_label</span>
            <div className='w-full'>
              <EditableText
                style={titleStyle.style}
                dataText={card.cardTitle}
                dataUpdateFunc={handleTitleUpdate}
              />
              <p className='text-gray-600 pl-2 leading-loose'>
                <strong>{card.listTitle}</strong> list
              </p>
            </div>
          </div>
          <CardDescription
            handleCardUpdate={handleCardUpdate}
            selectedCard={card}
          />
          <Checklist dispatchCards={dispatchCards} selectedCard={card} />
          <CardPriority
            handleCardUpdate={handleCardUpdate}
            selectedCard={card}
          />
          <CardDate selectedCard={card} />
          <div className='flex py-3 my-6'>
            <button
              onClick={() => handleCardDelete()}
              className='ml-auto bg-gray-100 text-gray-500 hover:text-red-600
          font-medium px-3 py-1 shadow-sm rounded-md transition-colors duration-150'
            >
              Delete Card
            </button>
          </div>
        </Dialog.Content>
      )}
    </Dialog>
  );
};

export default CardDetailsBox;
