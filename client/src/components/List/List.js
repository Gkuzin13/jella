import { useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import listApi from '../../api/listApi';
import useClickOutside from '../../hooks/useClickOutside';
import ACTIONS from '../../reducers/actions';
import CardsContainer from '../Card/CardsContainer';
import ListActionsBox from '../List/ListActionsBox';
import CardForm from '../Card/CardForm';
import ListTitle from './ListTitle';

const List = ({
  listData,
  cards,
  dispatchLists,
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

  const handleTitleUpdate = (value) => {
    const updatedList = { ...listData, listTitle: value };

    dispatchLists({
      type: ACTIONS.EDIT_LIST,
      payload: updatedList,
    });

    listApi.updateList(updatedList);
  };

  const handleListDelete = (id) => {
    dispatchLists({
      type: ACTIONS.DELETE_LIST,
      payload: id,
    });

    setListActionsBox(false);
    listApi.deleteList(id);
  };

  const handleColorChange = (color) => {
    const updatedList = { ...listData, coverColor: color };

    dispatchLists({
      type: ACTIONS.EDIT_LIST,
      payload: updatedList,
    });

    listApi.updateList(updatedList);
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
              listTitle={listData.listTitle}
              handleTitleUpdate={handleTitleUpdate}
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
                  handleColorChange={handleColorChange}
                  listData={listData}
                />
              )}
            </div>
          </div>
          <CardForm
            listCards={cards}
            listId={listData._id}
            dispatchCards={dispatchCards}
          />
          <CardsContainer
            cards={cards}
            listId={listData._id}
            dispatchCards={dispatchCards}
            toggleCardBox={toggleCardBox}
          />
        </div>
      )}
    </Draggable>
  );
};

export default List;
