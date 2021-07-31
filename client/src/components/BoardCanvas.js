import List from './List';
import ListForm from './ListForm';
import { Droppable } from 'react-beautiful-dnd';

const BoardCanvas = ({
  boardId,
  lists,
  cards,
  subtasks,
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
          className='flex items-start p-2'>
          {lists.map((list, index) => {
            return (
              <List
                key={list._id}
                index={index}
                listData={list}
                cards={cards}
                subtasks={subtasks}
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
