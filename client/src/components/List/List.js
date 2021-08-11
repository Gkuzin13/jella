import { useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import listApi from '../../api/listApi';
import ClickOutside from '../../hooks/ClickOutside';
import { ACTIONS } from '../../hooks/reducers/reducers';
import CardsContainer from '../Card/CardsContainer';
import ListActionsBox from '../List/ListActionsBox';
import CardForm from '../Card/CardForm';

const List = ({
  listData,
  cards,
  dispatchLists,
  dispatchCards,
  toggleCardBox,
  index,
}) => {
  const [listActionsBox, setListActionsBox] = useState(false);
  const [textValue, setTextValue] = useState(listData.listTitle);

  const boxRef = useRef();

  ClickOutside(boxRef, listActionsBox, () => {
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

  const handleOnChange = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <Draggable draggableId={listData._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='flex flex-col flex-shrink-0  bg-gray-100 
          shadow w-72 mr-4 rounded-sm '>
          <div
            className={`flex justify-between items-center py-1 px-2 bg-${listData.coverColor}-500 bg-opacity-90
            rounded-t-sm rounded-b-none`}>
            <div>
              <h2 className='font-medium p-1 px-2 hidden'>{textValue}</h2>
              <input
                onBlur={() => handleTitleUpdate(textValue)}
                onChange={(e) => handleOnChange(e)}
                className='font-medium bg-transparent focus:bg-white focus:text-black text-white 
                p-1 px-2'
                value={textValue}
                name='cardTitle'
                autoComplete='off'
              />
            </div>
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
                  listId={listData._id}
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
