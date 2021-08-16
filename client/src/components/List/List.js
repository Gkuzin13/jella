import { useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import useClickOutside from '../../hooks/useClickOutside';
import CardsContainer from '../Card/CardsContainer';
import ListActionsBox from '../List/ListActionsBox';
import ListTitle from './ListTitle';

const List = ({
  listData,
  cards,
  handleListUpdate,
  handleListDelete,
  dispatchCards,
  toggleCardBox,
  index,
}) => {
  const [listActionsBox, setListActionsBox] = useState(false);

  const boxRef = useRef();

  useClickOutside(boxRef, listActionsBox, () => {
    toggleActionsBox(!listActionsBox);
  });

  const toggleActionsBox = () => {
    setListActionsBox(!listActionsBox);
  };

  return (
    <Draggable draggableId={listData._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='flex flex-col flex-shrink-0 bg-gray-100 bg-opacity-90 shadow-md w-72 mr-4 rounded-sm'>
          <div
            className={`flex justify-between items-center py-1 px-2 bg-${listData.coverColor}-600 
            rounded-t-sm rounded-b-none`}>
            <ListTitle
              listData={listData}
              handleListUpdate={handleListUpdate}
            />
            <div>
              <button
                onClick={() => setListActionsBox(!listActionsBox)}
                className='flex justify-center p-1 hover:bg-gray-50 hover:bg-opacity-20'>
                <span className='material-icons text-white'>more_horiz</span>
              </button>

              {!listActionsBox ? null : (
                <ListActionsBox
                  toggleActionsBox={toggleActionsBox}
                  boxRef={boxRef}
                  handleListDelete={handleListDelete}
                  handleListUpdate={handleListUpdate}
                  listData={listData}
                />
              )}
            </div>
          </div>

          <CardsContainer
            cards={cards}
            listData={listData}
            toggleCardBox={toggleCardBox}
            dispatchCards={dispatchCards}
          />
        </div>
      )}
    </Draggable>
  );
};

export default List;
