import List from './List/List';
import ListForm from './List/ListForm';
import { Droppable } from 'react-beautiful-dnd';

const BoardCanvas = ({
  boardId,
  lists,
  cards,
  dispatchLists,
  dispatchCards,
  toggleCardBox,
}) => {
  return (
    <Droppable droppableId={boardId} direction='horizontal' type='LIST'>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className=' flex items-start pb-2 mb-2 bottom-0 top-0 left-0 right-0 '>
          {lists.map((list, index) => {
            const listCards = cards.filter((card) => card.listId === list._id);
            return (
              <List
                key={list._id}
                index={index}
                listData={list}
                cards={listCards}
                dispatchLists={dispatchLists}
                dispatchCards={dispatchCards}
                toggleCardBox={toggleCardBox}
              />
            );
          })}
          {provided.placeholder}

          <ListForm
            boardId={boardId}
            dispatchLists={dispatchLists}
            lists={lists}
          />
        </div>
      )}
    </Droppable>
  );
};

export default BoardCanvas;
